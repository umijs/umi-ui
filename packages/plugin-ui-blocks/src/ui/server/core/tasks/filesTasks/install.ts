import { installFilesDependencies } from '@umijs/block-sdk';
import { createDebug } from '@umijs/utils';
import { IFlowContext, IAddBlockOption } from '../../types';

const debug = createDebug('umi:umiui:UmiUI:block:filetasks');

const install = async (ctx: IFlowContext, args: IAddBlockOption) => {
  const { logger, execa, api } = ctx;
  const { registry } = ctx.stages;

  await installFilesDependencies(
    {
      npmClient: args.npmClient,
      registry,
      applyPlugins: api.applyPlugins,
      ApplyPluginsType: api.ApplyPluginsType,
      paths: api.paths,
      debug,
      dryRun: args.dryRun,
      spinner: logger,
      skipDependencies: args.skipDependencies,
      execa,
    },
    ctx.stages.blockCtx,
  );
};

export default install;
