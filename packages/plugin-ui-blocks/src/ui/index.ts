import { IApi } from 'umi';
import { isAbsolute, join } from 'path';
import server from './server';

export interface IApiBlock extends IApi {
  sendLog: (info: string) => void;
}

export default (api: IApiBlock) => {
  const { utils } = api;
  const { winPath, lodash } = utils;

  [
    'addBlockUIResource',
    'modifyBlockUIResources',
    '_modifyBlockNewRouteConfig',
    '_modifyBlockDependencies',
    '_modifyBlockPackageJSONPath',
    '_modifyBlockFile',
    'beforeBlockWriting',
    '_modifyBlockTarget',
  ].forEach(name => {
    api.registerMethod({
      name,
      exitsError: false,
    });
  });

  // 客户端
  api.addUIPlugin(() => require.resolve('../../dist/index.umd'));
  // 服务端
  server(api);

  // let routeComponents = null;

  // api.onRouteChange(() => {
  //   routeComponents = api.getRouteComponents();
  // });

  const getRouteComponents = (componentRoutes): string[] => {
    const getComponents = routes =>
      routes.reduce((memo, route) => {
        if (route.component && !route.component.startsWith('()')) {
          const component = isAbsolute(route.component)
            ? require.resolve(route.component)
            : require.resolve(join(this.cwd, route.component));
          memo.push(winPath(component));
        }
        if (route.routes) {
          memo = memo.concat(getComponents(route.routes));
        }
        return memo;
      }, []);

    return lodash.uniq(getComponents(componentRoutes));
  };

  api.modifyBabelOpts(async babelOpts => {
    const routes = await api.getRoutes();
    const routeComponents = getRouteComponents(routes);
    const { plugins } = babelOpts;
    return {
      ...babelOpts,
      plugins: [
        ...plugins,
        [
          require.resolve('../sdk/flagBabelPlugin'),
          {
            doTransform(filename) {
              return routeComponents.some(
                routeComponent => winPath(filename) === winPath(routeComponent),
              );
            },
          },
        ],
      ],
    };
  });

  api.addEntryCodeAhead(
    () => `
(() => {
  // Runtime block add component
  window.GUmiUIFlag = require('${require.resolve('../sdk/flagBabelPlugin/GUmiUIFlag')}').default;

  // Enable/Disable block add edit mode
  window.addEventListener('message', (event) => {
    try {
      const { action, data } = JSON.parse(event.data);
      switch (action) {
        case 'umi.ui.checkValidEditSection':
          const haveValid = !!document.querySelectorAll('div.g_umiuiBlockAddEditMode').length;
          const frame = document.getElementById('umi-ui-bubble');
          if (frame && frame.contentWindow) {
            frame.contentWindow.postMessage(
              JSON.stringify({
                action: 'umi.ui.checkValidEditSection.success',
                payload: {
                  haveValid,
                },
              }),
              '*',
            );
          }
        default:
          break;
      }
    } catch(e) {
    }
  }, false);
})();
  `,
  );
};
