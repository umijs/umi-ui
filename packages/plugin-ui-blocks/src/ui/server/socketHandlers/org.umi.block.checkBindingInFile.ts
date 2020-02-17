import { join } from 'path';
import { existsSync, readFileSync } from 'fs';
import haveRootBinding from '@umijs/block-sdk/lib/sdk/haveRootBinding';
import { utils } from 'umi';
import { IHandlerOpts } from '../index';

const { createDebug, winPath, getFile } = utils;

const debug = createDebug('umiui:UmiUI:block:checkBindingInFile');

export default async ({ success, payload, api, failure }: IHandlerOpts) => {
  const { path: targetPath, name } = payload as {
    path: string;
    name: string;
  };
  const { paths } = api;
  debug('absPagesPath', paths.absPagesPath);
  debug('targetPath', targetPath);
  // 找到具体的 js
  const absTargetPath = winPath(
    join(paths.absPagesPath, winPath(targetPath).replace(paths.absPagesPath, '')),
  );
  debug('absTargetPath', absTargetPath);
  // 有些用户路由下载路径是不在的，这里拦住他们
  if (
    !existsSync(absTargetPath) &&
    // 当前路由为单文件
    !getFile({ base: absTargetPath, fileNameWithoutExt: '', type: 'javascript' })?.path
  ) {
    failure({
      message: ` ${absTargetPath} 目录不存在!`,
      success: false,
    });
    return;
  }

  const entryPath =
    getFile({ base: absTargetPath, fileNameWithoutExt: 'index', type: 'javascript' })?.path ||
    getFile({ base: absTargetPath, fileNameWithoutExt: '', type: 'javascript' })?.path;

  debug('entryPath', entryPath);

  if (!entryPath) {
    failure({
      message: `未在 ${absTargetPath} 目录下找到 index.(ts|tsx|js|jsx) !`,
      success: false,
    });
    return;
  }
  const exists = await haveRootBinding(readFileSync(entryPath, 'utf-8'), name);

  success({
    exists,
    success: true,
  });
};
