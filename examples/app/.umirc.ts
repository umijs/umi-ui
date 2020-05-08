import { defineConfig } from 'umi'; // ref: https://umijs.org/config/

export default defineConfig({
  dva: {},
  ui: {
    blocks: {
      assets: [{ type: 'dumi', name: '@umijs/assets-umi' }],
    },
  },
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      path: '/',
      component: '../layouts/index',
      routes: [
        {
          path: '/',
          component: './index',
        },
      ],
    },
  ],
  presets: ['../../packages/preset-ui/lib/index.js', '@umijs/preset-react'],
});
