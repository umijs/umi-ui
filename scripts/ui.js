const { fork } = require('child_process');
const { signale } = require('@umijs/utils');
const { join } = require('path');
const { existsSync } = require('fs');

const UMI_BIN = require.resolve('@umijs/max/bin/max');
const UI_BUILD_BIN = require.resolve('../packages/ui-builder/bin/index.js');

const getPackages = require('./getPackage');

const watch = process.argv.includes('-w') || process.argv.includes('--watch');

const uiApp = () => {
  return new Promise((resolve, reject) => {
    try {
      const child = fork(UMI_BIN, [watch ? 'dev' : 'build', ...(watch ? ['--watch'] : [])], {
        env: {
          APP_ROOT: './packages/ui/web',
          UMI_UI: 'none',
          FRIENDLY_ERROR: 'none',
          UMI_UI_SERVER: 'none',
          PORT: 8002,
          BROWSER: 'none',
          NODE_ENV: watch ? 'production' : 'development',
          BABEL_POLYFILL: 'none',
        },
      });
      child.on('exit', code => {
        console.log('exit ui app build', code);
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

const buildPlugin = cwd => {
  return new Promise((resolve, reject) => {
    try {
      const pluginProcess = fork(UI_BUILD_BIN, watch ? ['--watch'] : [], {
        cwd,
        env: {
          NODE_ENV: watch ? 'production' : 'development',
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
  const uiPlugins = getPackages()
    .filter(
      ({ pkgPath }) => existsSync(join(pkgPath, 'ui')) || existsSync(join(pkgPath, 'ui.config.js')),
    )
    .map(({ pkgPath }) => pkgPath);

  const buildQueue = [...uiPlugins.map(buildPlugin), uiApp()];
  try {
    await Promise.all(buildQueue);
  } catch (e) {
    console.error('ee', e);
  }
})();
