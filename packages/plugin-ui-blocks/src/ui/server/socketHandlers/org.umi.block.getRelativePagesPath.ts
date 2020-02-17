/**
 *  C:\GitHub\ant-design-pro\src\pages\Welcome\index.tsx
 * --->
 *   Welcome\index.tsx
 *  用与将路径变化为相对路径
 *  */
import { utils } from 'umi';
import { IHandlerOpts } from '../index';

const { winPath } = utils;

export default function({ payload, api, success }: IHandlerOpts) {
  const { path: targetPath } = payload as {
    path: string;
  };

  success({
    data: winPath(targetPath)
      .replace(api.paths.absPagesPath, '')
      .replace(/\//g, '/')
      .replace(/\/\//g, '/'),
    success: true,
  });
}
