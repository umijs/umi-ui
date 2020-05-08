const TerserPlugin = require('terser-webpack-plugin');
const { dark } = require('@umijs/ui-theme');
const terserOptions = require('./terser');

module.exports = opts => {
  const { config, mode } = opts;
  const { entry, theme = dark, externals = [], resolve = {} } = config;

  return {
    entry,
    output: {
      libraryTarget: 'umd',
      globalObject: 'this',
      libraryExport: 'default',
      filename: `${typeof entry === 'object' ? '[name]' : 'index'}.umd.js`,
      auxiliaryComment: '',
    },
    mode,

    target: 'web',
    cache: false,
    devtool: 'source-map',
    externals: ['antd', 'react', 'react-dom', 'xterm', ...externals],

    optimization: {
      minimize: mode === 'production',
      minimizer: [
        new TerserPlugin({
          terserOptions,
          sourceMap: false,
          cache: true,
          parallel: true,
          extractComments: false,
        }),
      ],
    },

    resolve: {
      extensions: ['.jsx', '.js', '.tsx', '.ts', '.json'],
      symlinks: true,
      ...resolve,
    },

    module: {
      rules: [
        {
          test: /\.(less)(\?.*)?$/,
          use: [
            {
              loader: require.resolve('style-loader'),
              options: {
                base: 0,
              },
            },
            {
              loader: require.resolve('css-loader'),
              options: {
                importLoaders: 1,
                modules: {
                  localIdentName: '[local]___[hash:base64:5]',
                },
              },
            },
            {
              loader: require.resolve('postcss-loader'),
              options: {
                // Necessary for external CSS imports to work
                // https://github.com/facebookincubator/create-react-app/issues/2677
                ident: 'postcss',
                plugins: () => [
                  // https://github.com/luisrudge/postcss-flexbugs-fixes
                  require('postcss-flexbugs-fixes'),
                  // https://github.com/csstools/postcss-preset-env
                  require('postcss-preset-env')({
                    // https://cssdb.org/
                    stage: 3,
                  }),
                ],
              },
            },
            {
              loader: require.resolve('less-loader'),
              options: {
                modifyVars: theme,
                javascriptEnabled: true,
              },
            },
          ],
        },
        {
          test: /\.(jsx|ts|tsx)$/,
          loader: require.resolve('babel-loader'),
          options: {
            // Tell babel to guess the type, instead assuming all files are modules
            sourceType: 'unambiguous',
            babelrc: false,
            cacheDirectory: false,
            presets: [
              [
                require.resolve('@umijs/babel-preset-umi/app'),
                {
                  nodeEnv: process.env.NODE_ENV,
                  dynamicImportNode: false,
                  autoCSSModules: true,
                  svgr: true,
                  env: {
                    targets: {
                      node: true,
                      chrome: 49,
                      firefox: 64,
                      safari: 10,
                      edge: 13,
                      ios: 10,
                    },
                  },
                  import: [],
                },
              ],
            ],
          },
        },
      ],
    },
  };
};
