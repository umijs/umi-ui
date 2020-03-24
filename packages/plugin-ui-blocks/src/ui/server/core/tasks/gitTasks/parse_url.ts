import assert from 'assert';
import { IApi, utils } from 'umi';
import chalk from 'chalk';
import { join, dirname } from 'path';
import { existsSync } from 'fs';
import getNpmRegistry from 'getnpmregistry';
import { getParsedData, makeSureMaterialsTempPathExist } from '@umijs/block-sdk';

import { IFlowContext, IAddBlockOption, ICtxTypes } from '../../types';

const { lodash, createDebug } = utils;

const debug = createDebug('umiui:UmiUI:block:tasks');

async function getCtx({
  args = {},
  api,
}: {
  args: IAddBlockOption;
  api: IApi;
}): Promise<ICtxTypes> {
  const { url } = args;
  const { config } = api;

  const ctx: ICtxTypes = await getParsedData(url, {
    ...(config.block || {}),
    ...args,
  });

  debug('getCtx', ctx);

  if (!ctx.isLocal) {
    const blocksTempPath = makeSureMaterialsTempPathExist(args.dryRun);
    const templateTmpDirPath = join(blocksTempPath, ctx.id);
    lodash.merge(ctx, {
      routePath: args.routePath,
      sourcePath: join(templateTmpDirPath, ctx.path),
      branch: args.branch || ctx.branch,
      templateTmpDirPath,
      blocksTempPath,
      repoExists: existsSync(templateTmpDirPath),
    });
  } else {
    lodash.merge(ctx, {
      routePath: args.routePath,
      templateTmpDirPath: dirname(url),
    });
  }
  return ctx;
}

/**
 * 解析 url，
 * @param ctx
 * @param args
 */
const parseUrl = async (ctx: IFlowContext, args: IAddBlockOption) => {
  const { url } = args;
  ctx.logger.setId(url); // 设置这次 flow 的 log trace id
  ctx.result.blockUrl = url; // 记录当前的 url

  assert(url, `run ${chalk.cyan.underline('umi help block')} to checkout the usage`);
  const { paths, config } = ctx.api;
  const blockConfig: {
    npmClient?: string;
  } = config.block || {};

  const useYarn = existsSync(join(paths.cwd, 'yarn.lock'));
  const defaultNpmClient = blockConfig.npmClient || (useYarn ? 'yarn' : 'npm');
  const registryUrl = await getNpmRegistry();
  const blockCtx = await getCtx({
    args: {
      ...args,
      npmClient: args.npmClient || defaultNpmClient,
    },
    api: ctx.api,
  });

  ctx.stages.blockCtx = blockCtx;
  ctx.stages.registry = args.registry || registryUrl;
};

export default parseUrl;
