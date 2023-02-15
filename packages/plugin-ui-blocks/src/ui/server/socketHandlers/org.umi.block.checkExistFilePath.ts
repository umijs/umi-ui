import { AddBlockParams } from '@umijs/block-sdk/lib/data.d';
import { join } from 'path';
import { winPath } from '@umijs/utils';
import { existsSync } from 'fs';
import { IHandlerOpts } from '../index';

export default function({ success, payload, api }: IHandlerOpts) {
  const { path: blockPath } = payload as AddBlockParams;
  // 拼接真实的路径，应该是项目的 pages 目录下
  const absPath = winPath(join(api.paths.absPagesPath, blockPath));
  success({
    exists: existsSync(absPath),
    success: true,
  });
}
