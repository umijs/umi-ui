import { IApi } from 'umi';
import { signale } from '@umijs/utils';
import UmiUI from '@umijs/ui';

export default (api: IApi) => {
  api.onStart(async () => {
    const [command] = process.argv.slice(2);
    if (process.env.UMI_UI !== 'none' && !api.userConfig.ssr && command === 'dev') {
      const umiUI = new UmiUI();
      const { server, port } = await umiUI.start({
        browser: false,
      });
      process.env.UMI_UI_PORT = port;
      process.on('SIGINT', () => {
        signale.info('exit build by user');
        server.close();
        process.exit(0);
      });
    }
  });
};

export { UmiUI };
