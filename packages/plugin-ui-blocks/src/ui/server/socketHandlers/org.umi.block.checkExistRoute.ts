import { AddBlockParams } from '@umijs/block-sdk/lib/data.d';

export default function({ payload, blockService, success }) {
  const { path } = payload as AddBlockParams;
  success({
    exists: blockService.routeExists(path),
    success: true,
  });
}
