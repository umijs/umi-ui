import { isDumiAssets } from './validate';

test('isDumiAssets', () => {
  expect(isDumiAssets({})).toBeFalsy();
  expect(isDumiAssets({ assets: {} })).toBeFalsy();
  expect(isDumiAssets({ name: 'Hello', assets: { examples: [] } })).toBeFalsy();
  expect(isDumiAssets({ name: 'Hello', assets: { examples: [{}] } })).toBeTruthy();
  expect(isDumiAssets(JSON.stringify({ name: 'Hello', assets: { examples: [{}] } }))).toBeTruthy();
});
