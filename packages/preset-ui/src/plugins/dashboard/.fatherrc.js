const isProd = process.env.NODE_ENV === 'prod';

export default {
  entry: 'ui.tsx',
  typescriptOpts: {
    check: false,
  },
  extraExternals: ['antd', 'react', 'react-dom'],
  umd: {
    name: 'dashboard',
    minFile: isProd,
    sourcemap: !isProd,
    globals: {
      antd: 'window.antd',
      react: 'window.React',
      'react-dom': 'window.ReactDOM',
    },
  },
};
