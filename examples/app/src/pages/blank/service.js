import request from 'umi-request';

export function getText() {
  return request('/api/blank/text');
}
