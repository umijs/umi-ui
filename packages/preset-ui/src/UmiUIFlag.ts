import { readFileSync } from 'fs';
import { join } from 'path';

import { IApi, utils } from 'umi';

const { winPath } = utils;

export default (api: IApi) => {
  api.onGenerateFiles(() => {
    const tpl = readFileSync(join(winPath(__dirname), 'templates/UmiUIFlag.tpl'), 'utf-8');
    api.writeTmpFile({
      path: 'preset-ui/UmiUIFlag.tsx',
      content: tpl,
    });
  });

  api.addUmiExports(() => [
    {
      exportAll: true,
      source: '../preset-ui/UmiUIFlag',
    },
  ]);
};
