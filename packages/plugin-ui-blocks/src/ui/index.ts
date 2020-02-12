import { IApi } from 'umi';
import { isAbsolute, join } from 'path';
import server from './server';

export interface IApiBlock extends IApi {
  sendLog: (info: string) => void;
}

export default (api: IApiBlock) => {
  const { utils } = api;
  const { winPath, lodash } = utils;
  // 客户端
  api.addUIPlugin(() => require.resolve('../../dist/index.umd'));
  // 服务端
  server(api);

  // let routeComponents = null;

  // api.onRouteChange(() => {
  //   routeComponents = api.getRouteComponents();
  // });

  const getRouteComponents = routes => {
    const getComponents = routes => {
      return routes.reduce((memo, route) => {
        if (route.component && !route.component.startsWith('()')) {
          const component = isAbsolute(route.component)
            ? route.component
            : require.resolve(join(this.cwd, route.component));
          memo.push(winPath(component));
        }
        if (route.routes) {
          memo = memo.concat(getComponents(route.routes));
        }
        return memo;
      }, []);
    };

    return lodash.uniq(getComponents(routes));
  };

  api.modifyBabelOpts(async babelOpts => {
    const routes = await api.getRoutes();
    const routeComponents = getRouteComponents(routes);
    const { plugins } = babelOpts;
    console.log('routeComponents', routeComponents);
    return {
      ...babelOpts,
      plugins: [
        ...plugins,
        [
          require.resolve('../sdk/flagBabelPlugin'),
          {
            doTransform(filename) {
              console.log('filename', filename);
              return routeComponents.includes(winPath(filename));
            },
          },
        ],
      ],
    };
  });

  api.addEntryCode(
    () => `
(() => {
  // Runtime block add component
  window.GUmiUIFlag = require('${require.resolve('../sdk/flagBabelPlugin/GUmiUIFlag')}').default;

  // Enable/Disable block add edit mode
  window.addEventListener('message', (event) => {
    try {
      const { action, data } = JSON.parse(event.data);
      console.log('client block', { action, data });
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
