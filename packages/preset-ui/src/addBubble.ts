import { join } from 'path';
import { IApi } from '@umijs/types';
import { winPath } from '@umijs/utils';

export default (api: IApi) => {
  const { relativeToTmp } = api as any;
  api.addEntryCode(
    () => `
    (() => {
      try {
        const ua = window.navigator.userAgent;
        const isIE = ua.indexOf('MSIE ') > -1 || ua.indexOf('Trident/') > -1;
        if (isIE) return;

        // Umi UI Bubble
        require('${join(__dirname, './bubble')}').default({
          port: ${process.env.UMI_UI_PORT},
          path: '${winPath(api.cwd)}',
          currentProject: '${process.env.UMI_UI_CURRENT_PROJECT || ''}',
          isBigfish: ${process.env.BIGFISH_COMPAT},
        });
      } catch (e) {
        console.warn('Umi UI render error:', e);
      }
    })();
  `,
  );

  // TODO: chainWebpack
  // api.chainWebpackConfig(config => {
  //   config
  //     .plugin("umi-ui-compile-status")
  //     .use(require("./CompileStatusWebpackPlugin").default);
  // });
};
