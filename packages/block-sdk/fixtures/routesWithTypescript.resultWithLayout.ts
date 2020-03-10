import { IConfig } from '@umijs/types';
export default {
  title: 'umi-ts',
  plugins: ['@umijs/preset-react'],
  routes: [
    {
      path: '/aa',
      component: 'A',
      routes: [
        {
          path: '/aa/xx/sdad/demo',
          component: './aa/xx/sdad/Demo',
        },
      ],
    },
    {
      path: '/',
      component: 'index',
    },
  ],
} as IConfig;
