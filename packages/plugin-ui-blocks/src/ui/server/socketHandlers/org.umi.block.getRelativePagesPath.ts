/**
 *  C:\GitHub\ant-design-pro\src\pages\Welcome\index.tsx
 * --->
 *   Welcome\index.tsx
 *  用与将路径变化为相对路径
 *  */
import { utils } from 'umi';
import { IHandlerOpts } from '../index';

const { winPath, createDebug } = utils;

const debug = createDebug('umiui:UmiUI:block');

export default function({ payload, api, success }: IHandlerOpts) {
  const { path: targetPath } = payload as {
    path: string;
  };

  debug('getRelativePagesPath', targetPath, api.paths.absPagesPath);

  success({
    data: winPath(targetPath)
      .replace(api.paths.absPagesPath, '')
      .replace(api.paths.absSrcPath, '')
      .replace(/\//g, '/')
      .replace(/\/\//g, '/'),
    success: true,
  });
}
