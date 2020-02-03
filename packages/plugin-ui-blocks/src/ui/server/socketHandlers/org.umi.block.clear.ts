import { clearGitCache } from '@umijs/block-sdk';

export default function({ payload, api, success }) {
  const info = clearGitCache(payload, api);
  success({
    data: info,
    success: true,
  });
}
