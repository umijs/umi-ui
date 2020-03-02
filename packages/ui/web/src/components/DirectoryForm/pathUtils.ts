import { utils } from 'umi';
import immer from 'immer';
import { listDirectory } from '@/services/project';

const { winPath } = utils;

export const handleErrorMsg = (e: Error) => {
  const otherError = '读取失败';
  const systemError =
    e && e.code
      ? // ? formatMessage(
        //     {
        //       id: `org.umi.ui.global.readdir.code.${e.code}`,
        //       defaultMessage: otherError,
        //     },
        //     {
        //       path: e.path || path,
        //     },
        //   )
        '错误'
      : '';
  const customError = e && e.message ? e.message : otherError;
  return systemError || customError;
};
/**
 * \/\/ => /
 */
export const trimSlash = (path: string): string => winPath(path || '').replace(/\/\//g, '/');

/**
 * Windows:
 * C:/Users/jcl => ['C:/', 'Users', 'jcl']
 *
 * OS X || Linux:
 * /Users/jcl/ => ['/', 'Users', 'jcl']
 * / => ['/']
 */
export const path2Arr = (path: string): string[] => {
  const splitArr = immer(path.split('/'), (p: string[]) => {
    if (p[0] === '') {
      p[0] = '/';
    }
  });
  return splitArr
    .map((p, i) => {
      if (isWindows(splitArr)) {
        return i === 0 && p ? trimSlash(`${p}/`) : p;
      }
      return i === 0 && !p ? '/' : p;
    })
    .filter(p => p);
};

export const isWindows = (path: string[] | string) => {
  const arr = typeof path === 'string' ? path2Arr(path) : path;
  const [root] = arr || [];
  return root !== '/';
};

export const getBasename = (path: string): string => {
  const [basename] = path2Arr(path).slice(-1);
  return basename;
};

export const validateDirPath = async (path: string): Promise<void> => {
  try {
    await listDirectory({
      dirPath: path,
    });
  } catch (e) {
    const error = handleErrorMsg(e, path);
    throw new Error(error);
  }
};

/**
 * Windows:
 * ['C:/', 'Users', 'jcl'] => C:/Users/jcl
 *
 * OS X || Linux:
 * ['/', 'Users', 'jcl'] => /Users/jcl/
 */
export const arr2Path = (arr: string[]): string => {
  const pathArr = arr.filter(path => path);
  return trimSlash(
    pathArr
      .map((p, i) => {
        if (isWindows(pathArr) && i === 0) {
          return trimSlash(p);
        }
        return p;
      })
      .join('/'),
  );
};
