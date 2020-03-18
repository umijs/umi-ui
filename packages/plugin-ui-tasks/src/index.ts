import { join } from 'path';
import { IApi, utils } from 'umi';
import server from './server';

const { winPath } = utils;

export default (api: IApi) => {
  api.addUIPlugin(() => join(winPath(__dirname), '../ui/dist/index.umd.js'));
  server(api);
};
