import { utils } from 'umi';
import UmiUI from '../packages/ui/lib/UmiUI';

const { signale } = utils;

(async () => {
  process.env.CURRENT_PROJECT = 'examples/app';
  process.env.LOCAL_DEBUG = 'true';

  const umiui = new UmiUI();
  const { server } = await umiui.start();
  process.on('SIGINT', () => {
    signale.info('exit build by user');
    server.close();
    process.exit(0);
  });
})();
