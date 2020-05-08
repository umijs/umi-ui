import { IApi, utils } from 'umi';
import { readFileSync } from 'fs';
import { join } from 'path';
import server from './server';
import { getRouteComponents } from './utils';

const { winPath, Mustache } = utils;

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

  api.modifyBabelOpts(async babelOpts => {
    const routes = await api.getRoutes();
    const routeComponents = getRouteComponents({
      componentRoutes: routes,
      paths,
      cwd: api.cwd,
    });
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
