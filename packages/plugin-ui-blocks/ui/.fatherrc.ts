const isProd = process.env.NODE_ENV === 'prod';

export default {
  entry: 'index.tsx',
  typescriptOpts: {
    check: false,
  },
  extraExternals: ['antd', 'react', 'react-dom'],
  umd: {
    name: 'blocks',
    sourcemap: !isProd,
    globals: {
      antd: 'window.antd',
      react: 'window.React',
      'react-dom': 'window.ReactDOM',
    },
  },
};
