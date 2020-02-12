import { IApi, utils } from 'umi';
import UmiUI from '@umijs/ui';

const { signale } = utils;

export default (api: IApi) => {
  api.registerCommand({
    name: 'ui',
    fn: async ({ args }) => {
      // TODO: start ui
      const umiUI = new UmiUI();
      const { server, port } = await umiUI.start();
      process.on('SIGINT', () => {
        signale.info('exit build by user');
        server.close();
        process.exit(0);
      });
    },
  });
};
