import { IApi, utils } from 'umi';
import { readFileSync } from 'fs';
import { isAbsolute, join } from 'path';
import server from './server';

const { winPath, lodash, Mustache } = utils;

export interface IApiBlock extends IApi {
  sendLog: (info: string) => void;
}

export default (api: IApiBlock) => {
  const { paths } = api;

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
        if (
          route.component &&
          typeof route.component === 'string' &&
          !route.component.startsWith('(') &&
          !route.component?.includes('node_modules')
        ) {
          const routeComponent = route.component
            ?.replace('@@', paths.absTmpPath)
            ?.replace('@', paths.absSrcPath);
          const component = isAbsolute(routeComponent)
            ? require.resolve(routeComponent)
            : require.resolve(join(api.cwd, routeComponent));
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

  api.addEntryCodeAhead(() => {
    const injectUIFlagTpl = readFileSync(
      join(__dirname, './templates/injectUIFlag.ts.tpl'),
      'utf-8',
    );
    return Mustache.render(injectUIFlagTpl, {
      GUmiUIFlagPath: winPath(require.resolve('../sdk/flagBabelPlugin/GUmiUIFlag')),
    });
  });
};
