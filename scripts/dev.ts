import signale from 'signale';
import UmiUI from '../packages/ui/src/UmiUI';

(async () => {
  process.env.CURRENT_PROJECT = 'examples/app';
  process.env.LOCAL_DEBUG = 'true';
  // reset umi-build-dev/Service ui plugins
  process.env.UMI_UI = 'none';

  const umiui = new UmiUI();
  const { server } = await umiui.start();
  process.on('SIGINT', () => {
    signale.info('exit build by user');
    server.close();
    process.exit(0);
  });
})();
