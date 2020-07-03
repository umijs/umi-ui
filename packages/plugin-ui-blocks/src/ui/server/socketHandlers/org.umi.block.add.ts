import { utils } from 'umi';
import { ResourceType, DEPS_TYPE } from '@umijs/block-sdk/lib/enum';
import { IHandlerOpts } from '../index';

const { createDebug } = utils;

const debug = createDebug('umiui:UmiUI:block:add');

export default async function({ blockService, success, payload }: IHandlerOpts) {
  const { url, resourceType } = payload;
  const isDumi = resourceType === ResourceType.dumi;
  const files = {};
  const dependencies = {};
  if (isDumi && payload.dependencies) {
    Object.keys(payload.dependencies).forEach(depName => {
      const depValue = payload.dependencies[depName];
      if (depValue.value) {
        if (depValue?.type === DEPS_TYPE.FILE) {
          files[depName] = depValue.value;
        }
        if (depValue?.type === DEPS_TYPE.NPM) {
          dependencies[depName] = depValue.value;
        }
      }
    });
  }
  const params = isDumi ? { ...payload, files, dependencies } : payload;
  debug('params', params);
  await blockService.run(params);
  success({
    data: {
      message: `🎊 ${isDumi ? Object.keys(files || {}).join(',') : url} block is adding`,
    },
    success: true,
  });
}
