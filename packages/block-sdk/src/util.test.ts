import { got } from '@umijs/utils';
import {
  routeExists,
  genBlockName,
  depthRouterConfig,
  genRouterToTreeData,
  reduceData,
  fetchDumiResource,
} from './util';
import { PKG_ASSETS_META } from './index';
import routerConfig from '../fixtures/util/routerConfig';

test('not exists', () => {
  expect(routeExists('/foo', [{ path: '/bar' }])).toEqual(false);
});

test('exists', () => {
  expect(routeExists('/foo', [{ path: '/bar' }, { path: '/foo' }])).toEqual(true);
});

test('child routes exists', () => {
  expect(routeExists('/foo', [{ routes: [{ path: '/bar' }, { path: '/foo' }] }])).toEqual(true);
});

test('pro routes exists', () => {
  expect(
    routeExists('/welcome', [
      {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/login',
          },
        ],
      },
      {
        path: '/',
        component: '../layouts/SecurityLayout',
        routes: [
          {
            path: '/',
            component: '../layouts/BasicLayout',
            authority: ['admin', 'user'],
            routes: [
              {
                path: '/',
                redirect: '/welcome',
              },
              {
                path: '/welcome',
                name: 'welcome',
                icon: 'smile',
                component: './Welcome',
              },
              {
                name: 'accountcenter',
                path: '/accountcenter',
                component: './accountcenter',
              },
              {
                component: './404',
              },
            ],
          },
          {
            component: './404',
          },
        ],
      },
      {
        component: './404',
      },
    ]),
  ).toEqual(true);
});

test('genBlockName test', () => {
  expect(genBlockName('DashboardAnalysis')).toEqual('dashboard/analysis');
});

test('gen router config', () => {
  expect(depthRouterConfig(reduceData(genRouterToTreeData(routerConfig)))).toMatchSnapshot();
});

test('fetchDumiResource latest', async () => {
  const registry = 'http://test';
  const name = '@umijs/assets-umi';
  const prefix = `${registry}/${name}@latest`;
  const gotMock = jest.spyOn(got, 'get').mockImplementation((requestUrl: string) => {
    const urlMap = {
      [`${prefix}/package.json`]: JSON.stringify({
        [PKG_ASSETS_META]: './assets/assets.json',
      }),
      [`${prefix}/assets/assets.json`]: JSON.stringify({
        name: 'test',
        assets: {
          examples: [
            { name: 'block1', type: 'BLOCK' },
            { name: 'block2', type: 'BLOCK' },
            { name: 'template1', type: 'TEMPLATE' },
            { name: 'template2', type: 'TEMPLATE' },
            { name: 'component1', type: 'COMPONENT' },
            { name: 'component2', type: 'COMPONENT' },
          ],
        },
      }),
    };
    return Promise.resolve({
      body: urlMap[requestUrl],
    });
  });
  const result = await fetchDumiResource({
    name,
    registry,
  });
  expect(result).toEqual({
    data: [
      {
        name: 'test',
        blockType: 'block',
        assets: [
          { name: 'block1', type: 'BLOCK' },
          { name: 'block2', type: 'BLOCK' },
        ],
      },
      {
        name: 'test',
        blockType: 'template',
        assets: [
          { name: 'template1', type: 'TEMPLATE' },
          { name: 'template2', type: 'TEMPLATE' },
        ],
      },
      {
        name: 'test',
        blockType: 'component',
        assets: [
          { name: 'component1', type: 'COMPONENT' },
          { name: 'component2', type: 'COMPONENT' },
        ],
      },
    ],
  });
  gotMock.mockRestore();
});

test('fetchDumiResource version', async () => {
  const registry = 'http://test';
  const name = '@umijs/assets-umi';
  const version = '~1.0.0';
  const prefix = `${registry}/${name}@${version}`;
  const gotMock = jest.spyOn(got, 'get').mockImplementation((requestUrl: string) => {
    const urlMap = {
      [`${prefix}/package.json`]: JSON.stringify({
        [PKG_ASSETS_META]: './assets/assets.json',
      }),
      [`${prefix}/assets/assets.json`]: JSON.stringify({
        assets: {
          examples: [
            { name: 'block1', type: 'BLOCK' },
            { name: 'block2', type: 'BLOCK' },
            { name: 'template1', type: 'TEMPLATE' },
            { name: 'template2', type: 'TEMPLATE' },
            { name: 'component1', type: 'COMPONENT' },
            { name: 'component2', type: 'COMPONENT' },
          ],
        },
      }),
    };
    return Promise.resolve({
      body: urlMap[requestUrl],
    });
  });
  const result = await fetchDumiResource({
    name,
    version,
    registry,
  });
  expect(result).toEqual({
    data: {
      assets: {
        block: [
          { name: 'block1', type: 'BLOCK' },
          { name: 'block2', type: 'BLOCK' },
        ],
        template: [
          { name: 'template1', type: 'TEMPLATE' },
          { name: 'template2', type: 'TEMPLATE' },
        ],
        component: [
          { name: 'component1', type: 'COMPONENT' },
          { name: 'component2', type: 'COMPONENT' },
        ],
      },
    },
  });
  gotMock.mockRestore();
});
