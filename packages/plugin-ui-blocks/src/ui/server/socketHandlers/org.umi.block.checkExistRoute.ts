import { AddBlockParams } from '@umijs/block-sdk/lib/data.d';

export default async function({ payload, blockService, success }) {
  const { path } = payload as AddBlockParams;
  const exists = await blockService.routeExists(path);
  success({
    exists,
    success: true,
  });
}
