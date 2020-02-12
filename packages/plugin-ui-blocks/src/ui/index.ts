import { IApi } from 'umi';
import server from './server';

export interface IApiBlock extends IApi {
  sendLog: (info: string) => void;
}

export default (api: IApiBlock) => {
  const { utils } = api;
  const { winPath } = utils;
  // 客户端
  api.addUIPlugin(() => require.resolve('../../dist/index.umd'));
  // 服务端
  server(api);

  // let routeComponents = null;

  // api.onRouteChange(() => {
  //   routeComponents = api.getRouteComponents();
  // });

  api.modifyBabelOpts(babelOpts => {
    const routeComponents = api.getRouteComponents();
    const { plugins } = babelOpts;
    return {
      ...babelOpts,
      plugins: [
        ...plugins,
        [
          require.resolve('../sdk/flagBabelPlugin'),
          {
            doTransform(filename) {
              return routeComponents.includes(winPath(filename));
            },
          },
        ],
      ],
    };
  });

  // api.modifyAFWebpackOpts(memo => {
  //   routeComponents = api.getRouteComponents();
  //   memo.extraBabelPlugins = [
  //     ...(memo.extraBabelPlugins || []),
  //   ];
  //   return memo;
  // });

  api.addEntryCode(
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
