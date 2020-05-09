import { defineConfig } from 'umi'; // ref: https://umijs.org/config/

export default defineConfig({
  dva: {},
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
