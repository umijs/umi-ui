import { IConfig } from 'umi'; // ref: https://umijs.org/config/

const config: IConfig = {
  routes: [
    {
      path: '/',
      component: '../layouts/index',
      routes: [
        {
          name: 'Blank',
          path: '/blank',
          component: './blank',
        },
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
