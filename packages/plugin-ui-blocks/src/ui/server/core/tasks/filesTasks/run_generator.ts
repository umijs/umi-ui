import { utils } from 'umi';
import { join } from 'path';
import { getBlockGenerator, getNameFromPkg } from '@umijs/block-sdk';
import { IFlowContext, IAddBlockOption } from '../../types';

const { winPath, createDebug } = utils;

const debug = createDebug('umi:umiui:UmiUI:block:filetasks');

export default async (ctx: IFlowContext, args: IAddBlockOption) => {
  const { logger, api } = ctx;

  debug('Task files - run generator');

  const { dryRun, page: isPage, js, execution = 'shell', uni18n, files } = args;

  logger.appendLog();
  logger.appendLog('📦  Start generate files');

  const { pkg, sourcePath, filePath, routePath } = ctx.stages.blockCtx;

  let isPageBlock = pkg.blockConfig && pkg.blockConfig.specVersion === '0.1';
  if (isPage !== undefined) {
    // when user use `umi block add --page`
    isPageBlock = isPage;
  }
  debug(`isPageBlock: ${isPageBlock}`);

  // const latestPkgPath = winPath(join(__dirname, '../../../../../package.json'));

  // const generator = new BlockGenerator({
  //   name: args._ ? args._.slice(2) : [],
  //   args: {
  //     sourcePath,
  //     path: filePath,
  //     routePath,
  //     blockName: args.name || getNameFromPkg(pkg),
  //     isPageBlock,
  //     dryRun,
  //     execution,
  //     env: {
  //       cwd: api.cwd,
  //     },
  //     resolved: latestPkgPath,
  //   },
  // });
  try {
    // 写区块到目录
    console.log('files', files);
    console.log('ctx.stages.blockCtx', ctx.stages.blockCtx);
  } catch (e) {
    logger.appendLog(`Faild generate files: ${e.message}\n`);
    throw new Error(e);
  }

  debug('Success generate files');
  logger.appendLog('🎉  Success generate files\n');

  // 调用 sylvanas 转化 ts
  if (js) {
    // 区块需要拼接一下 blockName
    // const relayPath = generator.isPageBlock
    //   ? generator.blockFolderPath
    //   : `${generator.blockFolderPath}/${generator.blockName}`;
    logger.appendLog('🎭  Start TypeScript to JavaScript');
    // require('@umijs/block-sdk/lib/tsTojs').default(relayPath);
    logger.appendLog('🎉  Success TypeScript to JavaScript\n');
  }

  if (uni18n) {
    logger.appendLog('🌏  Start remove i18n code');
    // require('@umijs/block-sdk/lib/remove-locale').default(generator.blockFolderPath, uni18n);
    logger.appendLog('🎉  Success remove i18n code\n');
  }

  // ctx.stages.generator = generator;
  debug('run_generator finish');
};
