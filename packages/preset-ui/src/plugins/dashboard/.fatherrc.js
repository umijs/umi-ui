export default {
  entry: 'ui.tsx',
  typescriptOpts: {
    check: false,
  },
  extraExternals: ['antd', 'react', 'react-dom'],
  umd: {
    name: 'dashboard',
    minFile: false,
    sourcemap: 'inline',
    globals: {
      antd: 'window.antd',
      react: 'window.React',
      'react-dom': 'window.ReactDOM',
    },
  },
};
