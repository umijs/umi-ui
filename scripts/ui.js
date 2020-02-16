const { fork } = require('child_process');
const { utils } = require('umi');
const { join } = require('path');
const { uiPlugins } = require('./uiPlugins');

const UMI_BIN = require.resolve('umi/bin/umi');
const FATHER_BUILD_BIN = require.resolve('father-build/bin/father-build.js');
const watch = process.argv.includes('-w') || process.argv.includes('--watch');

const { signale } = utils;

const opts = {
  watch,
};

const uiApp = () => {
  signale.pending('UI App building');
  const { watch } = opts;
  return new Promise((resolve, reject) => {
    try {
      const child = fork(UMI_BIN, [watch ? 'dev' : 'build', ...(watch ? ['--watch'] : [])], {
        env: {
          APP_ROOT: './packages/ui/client',
          UMI_UI: 'none',
          UMI_UI_SERVER: 'none',
          PORT: 8002,
          BROWSER: 'none',
          BABEL_POLYFILL: 'none',
        },
      });
      child.on('exit', code => {
        if (code === 1) {
          signale.fatal('UI App build error');
          process.exit(1);
        }
        signale.complete('UI App done');
        resolve(child);
      });
    } catch (e) {
      reject(e);
    }
  });
};

const buildPlugin = plugin => {
  const { watch } = opts;
  return new Promise((resolve, reject) => {
    try {
      const pluginProcess = fork(FATHER_BUILD_BIN, watch ? ['--watch'] : [], {
        cwd: join(__dirname, '..', plugin),
        env: {
          NODE_ENV: watch ? 'prod' : 'development',
        },
      });
      pluginProcess.on('exit', code => {
        if (code === 1) {
          process.exit(1);
        }
        resolve(pluginProcess);
      });
    } catch (e) {
      reject(e);
    }
  });
};

(async () => {
  // exit by Ctrl/Cmd + C
  process.on('SIGINT', () => {
    signale.info('exit build by user');
    process.exit(0);
  });

  const buildQueue = [uiApp(), ...uiPlugins.map(buildPlugin)];
  try {
    await Promise.all(buildQueue);
  } catch (e) {
    console.error('ee', e);
  }
})();
