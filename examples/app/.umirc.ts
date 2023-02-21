import { defineConfig } from 'umi'; // ref: https://umijs.org/config/

export default defineConfig({
  dva: {},
  routes: [
    {
      path: '/',
      component: 'index',
    },
  ],
  presets: ['../../packages/preset-ui/lib/index.js'],
});
