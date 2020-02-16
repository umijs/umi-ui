export default [
  {
    target: 'node',
    cjs: { type: 'babel', lazy: true },
    disableTypeCheck: true,
  },
  {
    entry: 'ui/index.tsx',
    umd: {
      name: 'tasks',
      minFile: false,
      sourcemap: 'inline',
    },
    extraExternals: ['antd', 'react', 'react-dom', 'xterm'],
    typescriptOpts: {
      check: false,
      globals: {
        antd: 'window.antd',
        react: 'window.React',
        'react-dom': 'window.ReactDOM',
      },
    },
  },
];
