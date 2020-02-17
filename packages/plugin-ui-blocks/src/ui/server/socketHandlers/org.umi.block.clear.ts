import { clearGitCache } from '@umijs/block-sdk';
import { IHandlerOpts } from '../index';

export default function({ payload, success }: IHandlerOpts) {
  const info = clearGitCache(payload);
  success({
    data: info,
    success: true,
  });
}
