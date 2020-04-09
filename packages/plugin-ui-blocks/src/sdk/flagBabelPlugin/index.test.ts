import { utils } from 'umi';
import { transform } from '@babel/core';
import { join, basename } from 'path';
import { readdirSync, readFileSync, existsSync } from 'fs';

const { winPath } = utils;

const fixtures = join(winPath(__dirname), 'fixtures');

function testTransform(dir) {
  const filename = existsSync(join(fixtures, dir, 'origin.js'))
    ? join(fixtures, dir, 'origin.js')
    : join(fixtures, dir, 'origin.tsx');
  const origin = readFileSync(filename, 'utf-8');
  const { code } = transform(origin, {
    filename: `/tmp/pages/${basename(filename)}`,
    presets: [
      require.resolve('@umijs/babel-preset-umi/app.js'),
      require.resolve('@babel/preset-typescript'),
    ],
    plugins: [
      [
        require.resolve('./index'),
        {
          doTransform() {
            return true;
          },
        },
      ],
    ],
  });
  const expectedFile = existsSync(join(fixtures, dir, 'expected.js'))
    ? join(fixtures, dir, 'expected.js')
    : join(fixtures, dir, 'expected.tsx');
  const expected = readFileSync(expectedFile, 'utf-8');
  const { code: expectCode } = transform(expected, {
    filename: `/tmp/pages/${basename(filename)}`,
    presets: [
      require.resolve('@umijs/babel-preset-umi/app.js'),
      require.resolve('@babel/preset-typescript'),
    ],
  });
  // 处理下 babel 的问题
  const replaceCode = (res: string) =>
    res
      .trim()
      .replace(/[A-Z]:/g, '')
      .replace(/\/\*#__PURE__\*\//gm, '');

  // window 专用，去掉一下盘符，其实表现是正常的，但是为了保证测试通过
  expect(replaceCode(code)).toEqual(replaceCode(expectCode));
}

readdirSync(fixtures).forEach(dir => {
  if (dir.charAt(0) !== '.') {
    const fn = dir.endsWith('-only') ? test.only : test;
    fn(dir, () => {
      testTransform(dir);
    });
  }
});
