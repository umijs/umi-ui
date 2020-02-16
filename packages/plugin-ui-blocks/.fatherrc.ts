export default [
  {
    target: 'node',
    cjs: { type: 'babel', lazy: true },
    disableTypeCheck: true,
  },
  {
    entry: 'ui/index.tsx',
    typescriptOpts: {
      check: false,
    },
    extraExternals: ['antd', 'react', 'react-dom'],
    umd: {
      name: 'blocks',
      minFile: false,
      sourcemap: 'inline',
      globals: {
        antd: 'window.antd',
        react: 'window.React',
        'react-dom': 'window.ReactDOM',
      },
    },
  },
];
