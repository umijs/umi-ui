import { join } from 'path';
import { IApi } from 'umi';

export default (api: IApi) => {
  const { utils } = api;
  const { winPath } = utils;
  api.addEntryCode(
    () => `
    (() => {
      try {
        const ua = window.navigator.userAgent;
        const isIE = ua.indexOf('MSIE ') > -1 || ua.indexOf('Trident/') > -1;
        if (isIE) return;

        // Umi UI Bubble
        require('${winPath(join(__dirname, './bubble'))}').default({
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
  api.chainWebpack(config => {
    config.plugin('umi-ui-compile-status').use(require('./CompileStatusWebpackPlugin').default);
  });
};
