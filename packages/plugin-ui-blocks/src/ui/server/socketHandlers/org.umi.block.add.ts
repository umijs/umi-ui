import { AddBlockParams } from '@umijs/block-sdk/lib/data.d';
import { IHandlerOpts } from '../index';

export default async function({ blockService, success, payload }: IHandlerOpts) {
  const { url } = payload as AddBlockParams;
  await blockService.run({ ...payload });
  success({
    data: {
      message: `🎊 ${url} block is adding`,
    },
    success: true,
  });
}
