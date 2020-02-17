const isProd = process.env.NODE_ENV === 'prod';

export default {
  entry: 'ui.tsx',
  cssModules: true,
  typescriptOpts: {
    check: false,
  },
  extraExternals: ['antd', 'react', 'react-dom'],
  umd: {
    name: 'configuration',
    sourcemap: !isProd,
    minFile: isProd,
    globals: {
      antd: 'window.antd',
      react: 'window.React',
      'react-dom': 'window.ReactDOM',
    },
  },
};
