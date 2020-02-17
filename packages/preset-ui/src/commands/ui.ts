import { IApi, utils } from 'umi';
import UmiUI from '@umijs/ui';

const { signale } = utils;

export default (api: IApi) => {
  api.onStart(async () => {
    const [command] = process.argv.slice(2);
    if (process.env.UMI_UI !== 'none' && !api.userConfig.ssr && command === 'dev') {
      const umiUI = new UmiUI({
        browser: true,
      });
      const { server, port } = await umiUI.start();
      process.env.UMI_UI_PORT = port;
      process.on('SIGINT', () => {
        signale.info('exit build by user');
        server.close();
        process.exit(0);
      });
    }
  });
};
