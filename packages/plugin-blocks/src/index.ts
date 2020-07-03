import { utils, IApi } from 'umi';
import { clearGitCache, addBlock, getDefaultBlockList } from '@umijs/block-sdk';

const { signale, createDebug, chalk } = utils;
const debug = createDebug('plugin-blocks');

export default (api: IApi) => {
  const { userConfig } = api;
  const blockConfig = userConfig?.block || {};

  api.describe({
    key: 'block',
    config: {
      schema(joi) {
        return joi.number();
      },
    },
  });

  debug(`blockConfig ${blockConfig}`);

  async function block(args: any = {}, opts = {}) {
    let retCtx;
    switch (args._[0]) {
      case 'clear':
        await clearGitCache({ dryRun: args.dryRun });
        break;
      case 'add':
        retCtx = await addBlock({ ...args, url: args._[1] }, opts, api);
        break;
      case 'list':
        retCtx = await getDefaultBlockList(args, blockConfig, api);
        break;
      default:
        throw new Error(
          `Please run ${chalk.cyan.underline('umi help block')} to checkout the usage`,
        );
    }
    return retCtx; // return for test
  }

  const details = `

Commands:

  ${chalk.cyan(`add `)}     add a block to your project
  ${chalk.cyan(`list`)}     list all blocks
  ${chalk.cyan(`clear`)}    clear all git cache


Options for the ${chalk.cyan(`add`)} command:

  ${chalk.green(`--path              `)} the file path, default the name in package.json
  ${chalk.green(`--route-path        `)} the route path, default the name in package.json
  ${chalk.green(`--branch            `)} git branch
  ${chalk.green(`--npm-client        `)} the npm client, default npm or yarn (if has yarn.lock)
  ${chalk.green(`--skip-dependencies `)} don't install dependencies
  ${chalk.green(`--skip-modify-routes`)} don't modify the routes
  ${chalk.green(`--dry-run           `)} for test, don't install dependencies and download
  ${chalk.green(`--page              `)} add the block to a independent directory as a page
  ${chalk.green(`--layout            `)} add as a layout block (add route with empty children)
  ${chalk.green(`--js                `)} If the block is typescript, convert to js
  ${chalk.green(`--registry          `)} set up npm installation using the registry
  ${chalk.green(`--uni18n            `)} remove umi-plugin-locale formatMessage
  ${chalk.green(`--closeFastGithub   `)} If using custom block repository, please set it to true

Examples:

  ${chalk.gray(`# Add block`)}
  umi block add demo
  umi block add ant-design-pro/Monitor

  ${chalk.gray(`# Add block with full url`)}
  umi block add https://github.com/umijs/umi-blocks/tree/master/blocks/demo

  ${chalk.gray(`# Add block with specified route path`)}
  umi block add demo --path /foo/bar

  ${chalk.gray(`# List all blocks`)}
  umi block list
  `.trim();

  api.registerCommand({
    name: 'block',
    async fn({ args }) {
      if (!args._[0]) {
        // TODO: use plugin register args
        console.log(
          details
            .split('\n')
            .map(line => `  ${line}`)
            .join('\n'),
        );
        return;
      }
      // return only for test
      try {
        await block(args);
      } catch (e) {
        signale.error(e);
      }
    },
    // description: 'block related commands, e.g. add, list',
    // usage: `umi block <command>`,
    // details,
  });
};
