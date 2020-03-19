import { join } from 'path';
import { readdirSync } from 'fs';
import { IApi, utils } from 'umi';
import { Resource } from '@umijs/block-sdk/lib/data.d';
import { ILang } from '@umijs/ui-types';
import Block from './core/Block';
import { DEFAULT_RESOURCES } from './util';

const { winPath } = utils;

export interface IHandlerOpts {
  success: (res: any) => void;
  failure: (res: any) => void;
  payload: object;
  api: IApi;
  blockService: Block;
  lang: ILang;
  send: (res: any) => void;
  resources: Resource[];
}

export default (api: IApi) => {
  // 区块资源可扩展
  let resources: Resource[] = [];

  api.onUISocket(async ({ action, failure, success, send }) => {
    if (!resources.length) {
      resources = await api.applyPlugins({
        key: 'addBlockUIResource',
        type: api.ApplyPluginsType.add,
        initialValue: DEFAULT_RESOURCES,
      });
      resources = await api.applyPlugins({
        key: 'modifyBlockUIResources',
        type: api.ApplyPluginsType.modify,
        initialValue: resources,
      });
    }

    const blockService = new Block(api);
    blockService.init(send);
    const { type, payload = {}, lang } = action;

    const dir = winPath(join(__dirname, 'socketHandlers'));
    const files = readdirSync(dir)
      .filter(f => f.charAt(0) !== '.')
      .map(f => f.replace(/\.(js|ts)$/, ''));

    if (files.includes(type)) {
      try {
        const fn = require(join(dir, type)).default;
        const handlerOpts: IHandlerOpts = {
          api,
          success,
          failure,
          send,
          payload,
          lang,
          blockService,
          resources,
        };
        await fn(handlerOpts);
      } catch (e) {
        console.error(e);
        failure({
          message: e.message,
          success: false,
        });
      }
    }
  });
};
