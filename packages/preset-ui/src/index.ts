import type { IApi } from 'umi';

export default (api: IApi) => {
  // TODO: 区分生产和开发环境，生产环境引打包好的，或者通过异步远程加载也可以
  const injectBubble = process.env.NODE_ENV === 'development' && !api.userConfig.ssr;
  if (process.env.UMI_UI === 'none') {
    return {
      plugins: [],
    };
  }

  return {
    plugins: [
      require.resolve('./UmiUIRegisterMethods'),
      require.resolve('./UmiUIFlag'),
      require.resolve('./commands/UmiUI'),
      ...(injectBubble ? [require.resolve('./addBubble')] : []),
      require.resolve('./plugins/dashboard/index'),
      // TODO: 配置有变动，先关闭
      // require.resolve('./plugins/configuration/index'),
      require.resolve('@umijs/plugin-ui-tasks'),
      require.resolve('@umijs/plugin-ui-blocks'),
    ],
  };
};
