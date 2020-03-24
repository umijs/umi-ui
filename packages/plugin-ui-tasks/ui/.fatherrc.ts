const isProd = process.env.NODE_ENV === 'prod';

export default {
  entry: 'index.tsx',
  umd: {
    name: 'tasks',
    sourcemap: !isProd,
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
};
