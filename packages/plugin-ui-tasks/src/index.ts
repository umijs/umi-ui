import { join } from 'path';
import { IApi } from '@umijs/types';
import server from './server';

export default (api: IApi) => {
  api.addUIPlugin(join(__dirname, '../dist/index.umd.js'));
  server(api);
};
