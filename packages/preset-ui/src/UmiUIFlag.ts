import { readFileSync } from 'fs';
import { join } from 'path';

import { IApi } from 'umi';
import { winPath } from '@umijs/utils';

export default (api: IApi) => {
  api.onGenerateFiles(() => {
    const tpl = readFileSync(join(winPath(__dirname), 'templates/UmiUIFlag.tpl'), 'utf-8');
    api.writeTmpFile({
      path: 'index.tsx',
      tpl,
      context: {},
    });
  });
};
