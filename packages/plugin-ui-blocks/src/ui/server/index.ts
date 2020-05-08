import { join } from 'path';
import { IApi, utils } from 'umi';
import { AssetsType, AssetsConfig, fetchDumiAssets } from '@umijs/block-sdk';
import { Resource } from '@umijs/block-sdk/lib/data.d';
import { ILang } from '@umijs/ui-types';
import Block from './core/Block';
import { DEFAULT_RESOURCES } from './util';

const { winPath, glob, lodash, createDebug } = utils;

const debug = createDebug('umi:umiui:plugin-ui-blocks:server');

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

  // 避免每次请求都读取文件
  const dir = winPath(join(__dirname, 'socketHandlers'));
  const files = glob
    .sync('org.umi**(ts|js)', {
      cwd: dir,
      nodir: true,
      dot: false,
      absolute: false,
    })
    .map(f => f.replace(/\.(js|ts)$/, ''));

  api.onUISocket(async ({ action, failure, success, send }) => {
    const blockService = new Block(api);
    blockService.init(send);
    const { type, payload = {}, lang } = action;

    if (files.includes(type)) {
      try {
        const fn = require(join(dir, type)).default;
        // 处理资产
        const { ui } = api.config;
        if (!resources?.length) {
          if (ui?.blocks?.assets?.length > 0) {
            const assets = lodash.groupBy(ui.blocks.assets, asset => asset.type);
            if (assets?.[AssetsType.dumi]?.length > 0) {
              const dumiAssetsPromises = (ui.blocks.assets as AssetsConfig[]).map(async asset => {
                const { err, data } = await fetchDumiAssets({
                  name: asset.name,
                  version: asset.version,
                  registry: asset.registry,
                });
                if (err) return null;
                return {
                  id: asset.name,
                  type: AssetsType.dumi,
                  ...data,
                };
              });
              resources = (await Promise.all(dumiAssetsPromises)).filter(Boolean);
            }
          }
          resources = await api.applyPlugins({
            key: 'addBlockUIResource',
            type: api.ApplyPluginsType.add,
            initialValue: [...DEFAULT_RESOURCES, ...resources],
          });
          resources = await api.applyPlugins({
            key: 'modifyBlockUIResources',
            type: api.ApplyPluginsType.modify,
            initialValue: resources,
          });
        }
        debug('resouces', resources);
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
