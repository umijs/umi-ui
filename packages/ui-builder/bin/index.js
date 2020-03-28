#!/usr/bin/env node
const path = require('path');
const fs = require('fs');

const yParser = require('yargs-parser');
const webpack = require('webpack');
const rimraf = require('rimraf');

const getConfig = require('../');

const build = () =>
  new Promise((resolve, reject) => {
    const argv = yParser(process.argv.slice(2));
    const cwd = path.join(process.cwd(), argv._[0] || '');
    rimraf.sync(path.join(cwd, 'dist'));
    // ui.config.js
    let userConfig = {
      entry: './ui',
    };
    try {
      userConfig = require(path.join(cwd, 'ui.config.js'));
    } catch (e) {}

    const watch = !!argv.watch || !!argv.w;
    const config = getConfig({
      config: userConfig,
      watch,
      mode: argv.mode || (watch ? 'development' : 'production'),
    });
    const compiler = webpack(config);

    if (watch) {
      const watcher = compiler.watch(
        {
          ignored: [
            '**/fixtures{,/**}',
            '**/__test__{,/**}',
            '**/*.mdx',
            'node_modules',
            '**/*.+(test|e2e|spec).+(js|jsx|ts|tsx)',
          ],
          poll: false,
        },
        (err, stats) => {
          if (err || stats.hasErrors()) {
            try {
              console.log(stats.toString('errors-only'));
            } catch (e) {}
            return reject(new Error('build failed'));
          }
          console.log('🌈 [watch] ui build success');
        },
      );

      process.once('SIGINT', () => {
        watcher.close();
        resolve();
        process.exit(0);
      });
    } else {
      compiler.run((err, stats) => {
        console.log('🎉 ui build success');
        if (err || stats.hasErrors()) {
          try {
            console.log(stats.toString('errors-only'));
          } catch (e) {}
          return reject(new Error('build failed'));
        }
        resolve({ stats });
      });
    }
    // first build
  });

build().catch(e => {
  console.error('ui build error', e);
  process.exit(1);
});
