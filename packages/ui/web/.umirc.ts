import { join, parse } from 'path';
import LessThemePlugin from 'webpack-less-theme-plugin';
import { defineConfig, utils } from 'umi';
import { dark } from '@umijs/ui-theme';

const { NODE_ENV } = process.env;
const { winPath } = utils;

const terserOptions =
  NODE_ENV === 'production'
    ? {
        // remove console.* except console.error
        compress: {
          pure_funcs: ['console.log', 'console.info'],
        },
      }
    : {};

const externalCSS = ['xterm/css/xterm.css'];
const externalJS = [
  `react/umd/react.${NODE_ENV === 'production' ? 'production.min' : 'development'}.js`,
  `react-dom/umd/react-dom.${NODE_ENV === 'production' ? 'production.min' : 'development'}.js`,
  'moment/min/moment.min.js',
  'antd/dist/antd.min.js',
  'sockjs-client/dist/sockjs.min.js',
  'xterm/lib/xterm.js',
];

const publicPath = NODE_ENV === 'development' ? 'http://localhost:8002/' : '/';
const outputPath = NODE_ENV === 'development' ? './public' : './dist';

export default defineConfig({
  presets: ['@umijs/preset-react'],
  plugins: ['@umijs/plugin-esbuild'],
  nodeModulesTransform: {
    type: 'none',
  },
  outputPath,
  devServer: {
    // dev write assets into public
    writeToDisk: (filePath: string) =>
      [...externalJS, ...externalCSS].some(
        external => parse(external).base === parse(filePath).base,
      ),
  },
  esbuild: {},
  publicPath,
  history: {
    type: 'browser',
  },
  ignoreMomentLocale: true,
  hash: NODE_ENV === 'production',
  // uglifyJSOptions,
  terserOptions,
  links: [
    ...externalCSS.map(external => ({
      rel: 'stylesheet',
      href: `${publicPath}${parse(external).base}`,
    })),
  ],
  antd: {},
  scripts: [
    // polyfill
    ...externalJS.map(external => ({
      src: `${publicPath}${parse(external).base}`,
      crossOrigin: 'anonymous',
    })),
  ],
  externals: {
    react: 'window.React',
    'react-dom': 'window.ReactDOM',
    antd: 'window.antd',
    xterm: 'window.Terminal',
    moment: 'moment',
  },
  theme: dark,
  // generateCssModulesTypings: true,
  routes: [
    {
      path: '/project',
      component: '@/layouts/Project',
      routes: [
        {
          path: '/project/select',
          component: '@/pages/project',
        },
        {
          component: '404',
        },
      ],
    },
    {
      // for plugins to patch routes into dashboard identification
      key: 'dashboard',
      path: '/',
      component: '@/layouts/Dashboard',
      routes: [
        {
          path: '/',
          component: '@/pages/index',
        },
        {
          component: '404',
        },
      ],
    },
    {
      component: '404',
    },
  ],
  title: 'Umi UI',
  dva: {},
  cssLoader: {
    modules: {
      getLocalIdent: (
        context: {
          resourcePath: string;
        },
        _: string,
        localName: string,
      ) => {
        if (
          context.resourcePath.includes('node_modules') ||
          context.resourcePath.includes('global.less')
        ) {
          return localName;
        }
        const match = context.resourcePath.match(/src(.*)/);

        if (match && match[1]) {
          const umiUiPath = match[1].replace('.less', '');
          const arr = winPath(umiUiPath)
            .split('/')
            .map((a: string) => a.replace(/([A-Z])/g, '-$1'))
            .map((a: string) => a.toLowerCase());
          return `umi-ui${arr.join('-')}_${localName}`.replace(/--/g, '-');
        }

        return localName;
      },
    },
  },
  chainWebpack(config) {
    config.plugin('webpack-less-theme').use(
      new LessThemePlugin({
        theme: join(__dirname, './src/styles/parameters.less'),
      }),
    );
    const { path: absOutputPath } = config.toConfig().output;
    const to = NODE_ENV === 'development' ? join(__dirname, 'public') : absOutputPath;

    config.plugin('copy').tap(([args]) => [
      [
        ...args,
        ...externalCSS.map(external => ({
          from: require.resolve(external),
          to,
        })),
        ...externalJS.map(external => ({
          from: require.resolve(external),
          to,
        })),
      ],
    ]);

    return config;
  },
});
