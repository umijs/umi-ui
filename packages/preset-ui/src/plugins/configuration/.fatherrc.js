export default {
  entry: 'ui.tsx',
  cssModules: true,
  typescriptOpts: {
    check: false,
  },
  extraExternals: ['antd', 'react', 'react-dom'],
  umd: {
    name: 'configuration',
    sourcemap: 'inline',
    minFile: false,
    globals: {
      antd: 'window.antd',
      react: 'window.React',
      'react-dom': 'window.ReactDOM',
    },
  },
};
