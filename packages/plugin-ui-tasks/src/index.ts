import { join } from 'path';
import { IApi } from 'umi';
import { winPath } from '@umijs/utils';
import server from './server';

export default (api: IApi) => {
  api.addUIPlugin(() => join(winPath(__dirname), '../dist/index.umd.js'));
  server(api);
};
