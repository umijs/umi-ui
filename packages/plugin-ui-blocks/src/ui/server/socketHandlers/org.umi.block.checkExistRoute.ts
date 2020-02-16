import { AddBlockParams } from '@umijs/block-sdk/lib/data.d';
import { IHandlerOpts } from '../index';

export default async function({ payload, blockService, success }: IHandlerOpts) {
  const { path } = payload as AddBlockParams;
  const exists = await blockService.routeExists(path);
  success({
    exists,
    success: true,
  });
}
