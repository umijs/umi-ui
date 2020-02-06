import { IApi } from '@umijs/types';
import { signale } from '@umijs/utils';
import UmiUI from '@umijs/ui';

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
