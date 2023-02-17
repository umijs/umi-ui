import type { IApi } from 'umi';
import { winPath, Mustache } from '@umijs/utils';
import { readFileSync } from 'fs';
import { join } from 'path';
import server from './server';
import { getRouteComponents } from './utils';

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

  api.addExtraBabelPlugins(() => {
    const routes = api.config.routes;
    const routeComponents = getRouteComponents({
      componentRoutes: routes,
      paths,
      cwd: api.cwd,
    });
    return [
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
    ];
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
