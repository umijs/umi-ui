import { join } from 'path';
import { IApi } from 'umi';
import { existsSync, readFileSync } from 'fs';
import haveRootBinding from '@umijs/block-sdk/lib/sdk/haveRootBinding';

interface IOpts {
  success: (payload: any) => void;
  failure: (payload: any) => void;
  payload: any;
  api: IApi;
}

export default async ({ success, payload, api, failure }: IOpts) => {
  const { path: targetPath, name } = payload as {
    path: string;
    name: string;
  };
  const { utils } = api;
  const { winPath, getFile } = utils;
  // 找到具体的 js
  const absTargetPath = winPath(
    join(api.paths.absPagesPath, winPath(targetPath).replace(winPath(api.paths.absPagesPath), '')),
  );
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
