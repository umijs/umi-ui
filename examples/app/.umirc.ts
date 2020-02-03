import { IConfig } from 'umi-types'; // ref: https://umijs.org/config/

const config: IConfig = {
  treeShaking: true,
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
  plugins: [
    ['../../packages/plugin-ui/lib/index.js'], // 因为加载资产 UI，侵入性有条件判断，先这样加载
    ['../../packages/plugin-ui-blocks/lib/ui/index.js'], // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: true,
        dynamicImport: false,
        title: 'example',
        dll: false,
        routes: {
          exclude: [/components\//],
        },
      },
    ],
  ],
};
export default config;
