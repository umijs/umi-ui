import { join, dirname } from 'path';
import { IApi, utils } from 'umi';
import { ResourceType, PKG_ASSETS_META, IUIResource, AssetType } from '@umijs/block-sdk';
import { Resource } from '@umijs/block-sdk/lib/data.d';
import { ILang } from '@umijs/ui-types';
import Block from './core/Block';
import { DEFAULT_RESOURCES } from './util';

const { winPath, glob, lodash: _, createDebug, pkgUp } = utils;

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
        let resources: Resource[] = [];
        const fn = require(join(dir, type)).default;
        // api.pkg 有缓存，从最底层向上找，不会错
        const pkgPath = pkgUp.sync({
          cwd: api.cwd,
        });
        const {
          devDependencies = {},
          clientDependencies = {},
          dependencies = {},
          // for child assets depend on
          peerDependencies = {},
        } = require(pkgPath);
        const userDeps = {
          ...devDependencies,
          ...clientDependencies,
          ...dependencies,
          ...peerDependencies,
        };
        // 处理本地资产
        const dumiAssets = _.flatten(
          Object.keys(userDeps || {})
            .map(library => {
              try {
                // 依赖的 package.json 路径
                const libPkgPath = require.resolve(`${library}/package.json`, {
                  paths: [api.cwd, process.cwd()],
                });
                // 依赖路径
                const libPath = dirname(libPkgPath);
                const libPkg = require(libPkgPath);
                const assetsRelativePath = libPkg?.[PKG_ASSETS_META] || libPkg?.assets;
                if (assetsRelativePath) {
                  const resourcePath = join(libPath, assetsRelativePath);
                  const resource = require(resourcePath);
                  if (resource?.assets?.examples) {
                    const assets = _.groupBy(
                      resource.assets.examples,
                      example => AssetType[example.type],
                    ) as IUIResource;
                    const data: any = Object.keys(assets).map(blockType => ({
                      ...resource,
                      // 兼容之前的数据格式
                      ...(resource?.logo ? { icon: resource.logo } : {}),
                      blockType,
                      assets: assets[blockType],
                    }));
                    return data.map(item => ({
                      ...item,
                      id: resource.name,
                      resourceType: ResourceType.dumi,
                    }));
                  }
                }
              } catch (e) {
                debug('libPkg error', e);
              }
              return null;
            })
            .filter(Boolean),
        );
        delete require.cache[pkgPath];
        resources = await api.applyPlugins({
          key: 'addBlockUIResource',
          type: api.ApplyPluginsType.add,
          initialValue: [...resources, ...dumiAssets, ...DEFAULT_RESOURCES],
        });
        resources = await api.applyPlugins({
          key: 'modifyBlockUIResources',
          type: api.ApplyPluginsType.modify,
          initialValue: resources,
        });
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
