import { IConfig } from 'umi'; // ref: https://umijs.org/config/

const config: IConfig = {
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
};
export default config;
