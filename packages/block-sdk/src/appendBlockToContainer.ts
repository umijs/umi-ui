import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { createDebug } from '@umijs/utils';
import insertComponent from './sdk/insertComponent';
import { findJS } from './util';
import { INSERT_BLOCK_PLACEHOLDER, UMI_UI_FLAG_PLACEHOLDER } from './sdk/constants';

const debug = createDebug('umiui:block-sdk:appendBlockToContainer');

export const appendBlockToContainer = ({ entryPath, blockFolderName, dryRun, index }) => {
  debug('start to update the entry file for block(s) under the path...');

  /**
   * 获取地址
   */
  const oldEntry = readFileSync(entryPath, 'utf-8');
  debug(`insert component ${blockFolderName} with index ${index}`);
  debug('entryPath', entryPath);
  debug('blockFolderName', blockFolderName);

  const blockPath = join(dirname(entryPath), blockFolderName);
  debug('blockPath', blockPath);

  const absolutePath =
    findJS({
      base: blockPath,
      fileNameWithoutExt: '',
    }) ||
    findJS({
      base: blockPath,
      fileNameWithoutExt: 'index',
    });
  debug('absolutePath', absolutePath);

  const blockContent = readFileSync(absolutePath, 'utf-8');

  try {
    const newEntry = insertComponent(oldEntry, {
      identifier: blockFolderName,
      relativePath: `./${blockFolderName}`,
      absolutePath,
      isExtractBlock:
        blockContent.includes(INSERT_BLOCK_PLACEHOLDER) ||
        blockContent.includes(UMI_UI_FLAG_PLACEHOLDER),
      index,
    });

    if (!dryRun) {
      writeFileSync(entryPath, newEntry);
    }
  } catch (e) {
    console.error(`Failed write block component: ${e}\n`);
  }
};
