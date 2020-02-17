import { IConfig } from 'umi'; // ref: https://umijs.org/config/

const config: IConfig = {
  routes: [
    {
      path: '/',
      component: '../layouts/index',
      routes: [
        {
          path: '/',
          component: '../pages/index',
        },
      ],
    },
  ],
  presets: ['../../packages/preset-ui/lib/index.js'],
};
export default config;
