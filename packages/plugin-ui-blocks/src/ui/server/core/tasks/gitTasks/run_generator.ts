import { utils } from 'umi';
import { join } from 'path';
import { getBlockGenerator, getNameFromPkg } from '@umijs/block-sdk';
import { IFlowContext, IAddBlockOption } from '../../types';

const { winPath, createDebug } = utils;

const debug = createDebug('umi:umiui:UmiUI:block:tasks');

const generatorFunc = async (ctx: IFlowContext, args: IAddBlockOption) => {
  const { logger, api } = ctx;

  const { dryRun, page: isPage, js, execution = 'shell' } = args;

  logger.appendLog();
  logger.appendLog('📦  Start generate files');

  const BlockGenerator = getBlockGenerator(ctx.api);

  const { pkg, sourcePath, filePath, routePath, templateTmpDirPath } = ctx.stages.blockCtx;

  let isPageBlock = pkg.blockConfig && pkg.blockConfig.specVersion === '0.1';
  if (isPage !== undefined) {
    // when user use `umi block add --page`
    isPageBlock = isPage;
  }
  debug(`isPageBlock: ${isPageBlock}`);

  const latestPkgPath = winPath(join(__dirname, '../../../../../package.json'));

  const generator = new BlockGenerator({
    name: args._ ? args._.slice(2) : [],
    args: {
      sourcePath,
      path: filePath,
      routePath,
      blockType: args.blockType,
      blockName: args.name || getNameFromPkg(pkg),
      isPageBlock,
      dryRun,
      execution,
      env: {
        cwd: api.cwd,
      },
      resolved: latestPkgPath,
    },
  });
  try {
    await generator.run();
  } catch (e) {
    logger.appendLog(`Faild generate files: ${e.message}\n`);
    throw new Error(e);
  }

  // write dependencies
  if (pkg.blockConfig && pkg.blockConfig.dependencies) {
    const subBlocks = pkg.blockConfig.dependencies;
    try {
      await Promise.all(
        subBlocks.map((block: string) => {
          const subBlockPath = join(templateTmpDirPath, block);
          debug(`subBlockPath: ${subBlockPath}`);
          return new BlockGenerator({
            name: args._ ? args._.slice(2) : [],
            args: {
              sourcePath: subBlockPath,
              path: isPageBlock ? generator.path : join(generator.path, generator.blockFolderName),
              blockName: getNameFromPkg(
                // eslint-disable-next-line
                require(join(subBlockPath, 'package.json')),
              ),
              isPageBlock: false,
              dryRun,
              env: {
                cwd: api.cwd,
              },
              routes: api.userConfig.routes,
              resolved: latestPkgPath,
            },
          }).run();
        }),
      );
    } catch (e) {
      logger.appendLog(`Faild generate files: ${e.message}\n`);
      throw new Error(e);
    }
  }

  debug('Success generate files');
  logger.appendLog('🎉  Success generate files\n');

  // 调用 sylvanas 转化 ts
  if (js) {
    // 区块需要拼接一下 blockName
    const relayPath = generator.isPageBlock
      ? generator.blockFolderPath
      : `${generator.blockFolderPath}/${generator.blockName}`;
    logger.appendLog('🎭  Start TypeScript to JavaScript');
    require('@umijs/block-sdk/lib/tsTojs').default(relayPath);
    logger.appendLog('🎉  Success TypeScript to JavaScript\n');
  }

  ctx.stages.generator = generator;
  debug('run_generator finish');
};

export default generatorFunc;
