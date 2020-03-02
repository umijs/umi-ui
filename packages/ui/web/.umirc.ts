import { join } from 'path';
import LessThemePlugin from 'webpack-less-theme-plugin';
import { defineConfig, utils } from 'umi';
import { dark } from '@umijs/ui-theme';
import { version } from 'antd';

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

export default defineConfig({
  presets: ['@umijs/preset-react'],
  publicPath: NODE_ENV === 'development' ? 'http://localhost:8002/' : '/',
  history: {
    type: 'browser',
  },
  hash: NODE_ENV === 'production',
  // uglifyJSOptions,
  terserOptions,
  links: [
    {
      rel: 'stylesheet',
      href: '//gw.alipayobjects.com/os/lib/xterm/4.1.0/css/xterm.css',
    },
  ],
  headScripts: [
    // polyfill
    {
      src: '//gw.alipayobjects.com/as/g/component/map-set-polyfill/1.0.0/polyfill.min.js',
    },
    {
      src: `//gw.alipayobjects.com/os/lib/??react/16.8.6/umd/react.${
        NODE_ENV === 'development' ? 'development' : 'production.min'
      }.js,react-dom/16.8.6/umd/react-dom.${
        NODE_ENV === 'development' ? 'development' : 'production.min'
      }.js`,
    },
    {
      src: '//gw.alipayobjects.com/os/lib/moment/2.22.2/min/moment.min.js',
    },
    {
      src: `//gw.alipayobjects.com/os/lib/antd/${version}/dist/antd.min.js`,
    },
    { src: '//gw.alipayobjects.com/os/lib/sockjs-client/1.3.0/dist/sockjs.min.js' },
    { src: '//gw.alipayobjects.com/os/lib/xterm/4.1.0/lib/xterm.js' },
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
      component: '../layouts/Project',
      routes: [
        {
          path: '/project/select',
          component: '../pages/project',
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
      component: '../layouts/Dashboard',
      routes: [
        {
          path: '/',
          component: '../pages/index',
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
    return config;
  },
});
