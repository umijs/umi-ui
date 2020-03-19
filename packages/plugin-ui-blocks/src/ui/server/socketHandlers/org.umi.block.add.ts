import { AddBlockParams } from '@umijs/block-sdk/lib/data.d';
import { IHandlerOpts } from '../index';

export default async function({ blockService, success, payload }: IHandlerOpts) {
  const { url, files } = payload as AddBlockParams;
  await blockService.run(payload);
  success({
    data: {
      message: `🎊 ${url || Object.keys(files || {}).join(',')} block is adding`,
    },
    success: true,
  });
}
