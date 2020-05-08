import { got } from '@umijs/utils';
import {
  routeExists,
  genBlockName,
  depthRouterConfig,
  genRouterToTreeData,
  reduceData,
  fetchDumiAssets,
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

test('fetchDumiAssets latest', async () => {
  const registry = 'http://test';
  const name = '@umijs/assets-umi';
  const prefix = `${registry}/${name}@latest`;
  const gotMock = jest.spyOn(got, 'get').mockImplementation((requestUrl: string) => {
    const urlMap = {
      [`${prefix}/package.json`]: JSON.stringify({
        [PKG_ASSETS_META]: './assets/assets.json',
      }),
      [`${prefix}/assets/assets.json`]: JSON.stringify({
        hello: 'world',
      }),
    };
    return Promise.resolve({
      body: urlMap[requestUrl],
    });
  });
  const result = await fetchDumiAssets({
    name,
    registry,
  });
  expect(result).toEqual({
    data: {
      hello: 'world',
    },
  });
  gotMock.mockRestore();
});

test('fetchDumiAssets version', async () => {
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
        hello: 'world',
      }),
    };
    return Promise.resolve({
      body: urlMap[requestUrl],
    });
  });
  const result = await fetchDumiAssets({
    name,
    version,
    registry,
  });
  expect(result).toEqual({
    data: {
      hello: 'world',
    },
  });
  gotMock.mockRestore();
});
