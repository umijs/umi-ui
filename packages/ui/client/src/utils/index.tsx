import React from 'react';
import { history, getLocale as umiGetLocale } from 'umi';
import * as IUi from '@umijs/ui-types';
import querystring from 'querystring';
import { IProjectList, IProjectItem } from '@/enums';

const localeMapping: any = {
  en: 'en-US',
  'en-us': 'en-US',
  zh: 'zh-CN',
  'zh-cn': 'zh-CN',
};

export const getLocale = () => {
  const locale = umiGetLocale() || '';
  return localeMapping[locale.toLowerCase()] || 'zh-CN';
};

export const isMiniUI = (): boolean => {
  const qs = querystring.parse(window.location.search.slice(1)) || {};
  return 'mini' in qs;
};

export const getBasename = (path: string): string =>
  path
    .split('/')
    .filter(name => name)
    .slice(-1)[0];

export const findProjectPath = (data: IProjectList) => {
  const path = data?.projectsByKey?.[data?.currentProject]?.path;

  if (!path) {
    // throw new Error('findProjectPath path not existed');
    console.error('findProjectPath path not existed');
  }

  return path;
};

export const handleBack = (reload = true, url = '/project/select') =>
  new Promise(resolve => {
    history.push(url);
    if (reload) {
      window.location.reload();
    }
    resolve();
  });

interface IProjectListItem extends IProjectItem {
  key: string;
}

export const getProjectStatus = (item: IProjectListItem): 'success' | 'failure' | 'progress' => {
  if (!Array.isArray(item.creatingProgress)) {
    if (item?.creatingProgress?.success) return 'success';
    if (item?.creatingProgress?.failure) return 'failure';
    if (item.creatingProgress) return 'progress';
    return 'success';
  }
  const isSuccess = item.creatingProgress.every(i => i.status === 'SUCCESS');
  if (isSuccess) return 'success';
  const isFail = item.creatingProgress.some(i => i.status === 'FAIL');
  if (isFail) return 'failure';
  return 'progress';
};

interface IListItem extends IUi.ICurrentProject {
  active?: boolean;
  created_at: number | undefined;
}

/**
 *
 * @param list 列表
 * 列表排序：
 * 1. 优先排 active
 * 2. 失败的排最后
 * 3. 最新创建的排前面
 */
export const sortProjectList = (list: IListItem[]): IListItem[] =>
  list.sort((prev, next) => {
    let prevWeight = 0;
    let nextWeight = 0;
    if (prev.active) {
      prevWeight += Number.MAX_SAFE_INTEGER;
    }
    if (next.active) {
      nextWeight += Number.MAX_SAFE_INTEGER;
    }
    if (prev.created_at) {
      prevWeight += prev.created_at;
    }
    if (next.created_at) {
      nextWeight += next.created_at;
    }
    const prevStatus = getProjectStatus(prev as any);
    const nextStatus = getProjectStatus(next as any);
    if (prevStatus === 'failure') {
      prevWeight += Number.MIN_SAFE_INTEGER;
    }
    if (nextStatus === 'failure') {
      nextWeight += Number.MIN_SAFE_INTEGER;
    }

    return nextWeight - prevWeight;
  });

/**
 *
 * @param locales locale duplicate keys
 */
export const getDuplicateKeys = (locales: IUi.ILocale[]): string[] => {
  if (!Array.isArray(locales)) return [];
  const allLocaleKeys = locales.reduce((curr, acc) => {
    // { key: value, key2, value }
    const localeObj = Object.values(acc).reduce(
      (c, locale) => ({
        ...c,
        ...locale,
      }),
      {},
    );
    const localeKeys = Object.keys(localeObj);
    return curr.concat(localeKeys);
  }, [] as string[]);

  const _seen = new Set();
  const _store: string[] = [];
  return allLocaleKeys.filter(
    item => _seen.size === _seen.add(item).size && !_store.includes(item) && _store.push(item),
  );
};

export const isValidFolderName = (name: string): boolean =>
  typeof name === 'string' &&
  !name.match(/[/@\s+%:]|^[_.]/) &&
  encodeURIComponent(name) === name &&
  name.length <= 100;
