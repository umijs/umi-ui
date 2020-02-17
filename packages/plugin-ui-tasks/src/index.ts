import { join } from 'path';
import { IApi } from 'umi';
import server from './server';

export default (api: IApi) => {
  api.addUIPlugin(() => join(__dirname, '../dist/index.umd.js'));
  server(api);
};
