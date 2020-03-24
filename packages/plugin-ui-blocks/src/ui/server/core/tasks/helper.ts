import { existsSync } from 'fs';
import { join } from 'path';

export const isSubmodule = templateTmpDirPath =>
  existsSync(join(templateTmpDirPath, '.gitmodules'));

export const addPrefix = path => {
  if (!/^\//.test(path)) {
    return `/${path}`;
  }
  return path;
};
