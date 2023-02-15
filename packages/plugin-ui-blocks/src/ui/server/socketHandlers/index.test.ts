import fs from 'fs';
import { getFile } from '@umijs/utils';
import { join } from 'path';
import haveRootBinding from '@umijs/block-sdk/lib/sdk/haveRootBinding';
import { findJS } from '@umijs/block-sdk';
import checkIfCanAdd from './org.umi.block.checkIfCanAdd';
import checkBindingInFile from './org.umi.block.checkBindingInFile';

jest.mock('@umijs/block-sdk/lib/sdk/haveRootBinding');

describe('block interface socketHandlers test', () => {
  describe('org.umi.block.checkIfCanAdd', () => {
    it('约定式路由报错', () => {
      const params = {
        success: jest.fn(),
        failure: jest.fn(),
        lang: 'zh-CN',
        payload: {},
        api: {
          config: {
            plugins: ['@umijs/preset-react'],
          },
        },
      };
      checkIfCanAdd(params);
      expect(params.failure.mock.calls[0][0].message).toMatch(/不支持约定式路由/);

      const params2 = {
        success: jest.fn(),
        failure: jest.fn(),
        lang: 'zh-CN',
        payload: {},
        api: {
          config: {
            routes: [],
            plugins: ['@umijs/preset-react'],
          },
        },
      };

      checkIfCanAdd(params2);
      expect(params2.failure.mock.calls[0][0].message).toMatch(/不支持约定式路由/);
    });

    it('没有 package.json', () => {
      const existsSyncMock = jest.spyOn(fs, 'existsSync').mockImplementation(res => false);
      const params = {
        success: jest.fn(),
        failure: jest.fn(),
        lang: 'zh-CN',
        payload: {},
        api: {
          cwd: '/test/',
          config: {
            routes: [{ path: '/', component: './Index' }],
            plugins: ['@umijs/preset-react'],
          },
        },
      };
      checkIfCanAdd(params);
      expect(existsSyncMock).toHaveBeenCalledWith(join('/', 'test', 'package.json'));
      expect(params.failure.mock.calls[0][0].message).toMatch(/package\.json/);
      existsSyncMock.mockRestore();
    });

    it('dva', () => {
      const existsSyncMock = jest.spyOn(fs, 'existsSync').mockImplementation(res => true);
      const params = {
        success: jest.fn(),
        failure: jest.fn(),
        lang: 'zh-CN',
        payload: {
          item: {
            features: ['dva'],
          },
        },
        api: {
          cwd: '/test/',
          config: {
            routes: [{ path: '/', component: './Index' }],
            plugins: ['@umijs/preset-react'],
          },
        },
      };
      checkIfCanAdd(params);

      const params2 = {
        success: jest.fn(),
        failure: jest.fn(),
        lang: 'zh-CN',
        payload: {
          item: {
            features: ['dva'],
          },
        },
        api: {
          cwd: '/test/',
          config: {
            routes: [{ path: '/', component: './Index' }],
            dva: true,
            plugins: ['@umijs/preset-react'],
          },
        },
      };
      checkIfCanAdd(params2);
      expect(params2.failure).not.toHaveBeenCalled();
      expect(params2.success).toHaveBeenCalledWith({
        data: true,
        success: true,
      });
      existsSyncMock.mockRestore();
    });

    it('i18n', () => {
      const existsSyncMock = jest.spyOn(fs, 'existsSync').mockImplementation(res => true);
      const params = {
        success: jest.fn(),
        failure: jest.fn(),
        lang: 'zh-CN',
        payload: {
          item: {
            features: ['i18n'],
          },
        },
        api: {
          cwd: '/test/',
          config: {
            routes: [{ path: '/', component: './Index' }],
            plugins: ['@umijs/preset-react'],
          },
        },
      };
      checkIfCanAdd(params);
      expect(params.failure.mock.calls[0][0].message).toMatch(
        /@umijs\/preset-react 插件并开启 locale/,
      );

      const params_0 = {
        success: jest.fn(),
        failure: jest.fn(),
        lang: 'zh-CN',
        payload: {
          item: {
            features: ['i18n'],
          },
        },
        api: {
          cwd: '/test/',
          config: {
            routes: [{ path: '/', component: './Index' }],
            react: true,
            locale: {
              enable: false,
            },
          },
        },
      };
      checkIfCanAdd(params_0);

      const params2 = {
        success: jest.fn(),
        failure: jest.fn(),
        lang: 'zh-CN',
        payload: {
          item: {
            features: ['i18n'],
          },
        },
        api: {
          cwd: '/test/',
          config: {
            routes: [{ path: '/', component: './Index' }],
            react: true,
            locale: true,
          },
        },
      };
      checkIfCanAdd(params2);
      expect(params2.failure).not.toHaveBeenCalled();
      expect(params2.success).toHaveBeenCalledWith({
        data: true,
        success: true,
      });

      const params3 = {
        success: jest.fn(),
        failure: jest.fn(),
        lang: 'zh-CN',
        payload: {
          item: {
            features: ['i18n'],
          },
        },
        api: {
          cwd: '/test/',
          config: {
            routes: [{ path: '/', component: './Index' }],
            react: true,
            locale: {},
          },
        },
      };
      checkIfCanAdd(params3);
      expect(params3.failure).not.toHaveBeenCalled();
      expect(params3.success).toHaveBeenCalledWith({
        data: true,
        success: true,
      });

      existsSyncMock.mockRestore();
    });

    it('Bigfish', () => {
      const existsSyncMock = jest.spyOn(fs, 'existsSync').mockImplementation(res => true);
      process.env.BIGFISH_COMPAT = 'true';
      const params = {
        success: jest.fn(),
        failure: jest.fn(),
        lang: 'zh-CN',
        payload: {
          item: {
            features: ['dva', 'i18n'],
          },
        },
        api: {
          cwd: '/test/',
          config: {
            dva: {},
            routes: [{ path: '/', component: './Index' }],
          },
        },
      };
      checkIfCanAdd(params);
      expect(params.failure.mock.calls[0][0].message).toMatch(/请开启 locale 配置/);

      const params_0 = {
        success: jest.fn(),
        failure: jest.fn(),
        lang: 'zh-CN',
        payload: {
          item: {
            features: ['dva', 'i18n'],
          },
        },
        api: {
          cwd: '/test/',
          locale: {
            enable: false,
          },
          config: {
            dva: {},
            routes: [{ path: '/', component: './Index' }],
          },
        },
      };
      checkIfCanAdd(params_0);
      expect(params_0.failure.mock.calls[0][0].message).toMatch(/请开启 locale 配置/);

      const params2 = {
        success: jest.fn(),
        failure: jest.fn(),
        lang: 'zh-CN',
        payload: {
          item: {
            features: ['dva', 'i18n'],
          },
        },
        api: {
          cwd: '/test/',
          config: {
            dva: false,
            routes: [{ path: '/', component: './Index' }],
          },
        },
      };
      checkIfCanAdd(params2);
      expect(params2.failure.mock.calls[0][0].message).toMatch(/请开启 dva 配置/);

      const params3 = {
        success: jest.fn(),
        failure: jest.fn(),
        lang: 'zh-CN',
        payload: {
          item: {
            features: ['dva', 'i18n'],
          },
        },
        api: {
          cwd: '/test/',
          config: {
            routes: [{ path: '/', component: './Index' }],
            dva: true,
            locale: true,
          },
        },
      };
      checkIfCanAdd(params3);
      expect(params3.failure).not.toHaveBeenCalled();
      expect(params3.success).toHaveBeenCalledWith({
        data: true,
        success: true,
      });

      const params4 = {
        success: jest.fn(),
        failure: jest.fn(),
        lang: 'en-US',
        payload: {
          item: {
            features: ['dva', 'i18n'],
          },
        },
        api: {
          cwd: '/test/',
          config: {
            dva: false,
            routes: [{ path: '/', component: './Index' }],
          },
        },
      };
      checkIfCanAdd(params4);
      expect(params4.failure.mock.calls[0][0].message).toMatch(/请开启 dva 配置/);
      process.env.BIGFISH_COMPAT = null;
      existsSyncMock.mockRestore();
    });
  });

  describe('org.umi.block.checkBindingInFile', () => {
    afterAll(() => {
      jest.unmock('../../../sdk/haveRootBinding');
    });

    it('pages/bar.jsx 页面', async () => {
      const targetPaths = join('/', 'tmp', 'src', 'pages', 'bar.jsx');
      const existsSyncMock = jest
        .spyOn(fs, 'existsSync')
        .mockImplementation((path: string) => targetPaths.indexOf(path) > -1);

      const readFileSyncMock = jest
        .spyOn(fs, 'readFileSync')
        .mockImplementation((path: string) => '');
      const haveRootBindingMock = haveRootBinding.mockImplementation(res => Promise.resolve(false));

      const params = {
        success: jest.fn(),
        failure: jest.fn(),
        lang: 'zh-CN',
        payload: {
          path: '/bar',
          name: 'ButtonBasic',
        },
        api: {
          winPath: v => v,
          getFile,
          findJS,
          paths: {
            absPagesPath: join('/', 'tmp', 'src', 'pages'),
          },
        },
      };
      existsSyncMock.mockRestore();
      readFileSyncMock.mockRestore();
      haveRootBindingMock.mockRestore();
    });

    it('路径不存在', async () => {
      const existsSyncMock = jest
        .spyOn(fs, 'existsSync')
        .mockImplementation((path: string) => false);

      const readFileSyncMock = jest
        .spyOn(fs, 'readFileSync')
        .mockImplementation((path: string) => '');
      const haveRootBindingMock = haveRootBinding.mockImplementation(res => Promise.resolve(false));

      const params = {
        success: jest.fn(),
        failure: jest.fn(),
        lang: 'zh-CN',
        payload: {
          path: '/bar',
          name: 'ButtonBasic',
        },
        api: {
          winPath: v => v,
          getFile,
          paths: {
            absPagesPath: '/tmp/src/pages',
          },
        },
      };
      await checkBindingInFile(params);
      expect(params.failure).toHaveBeenCalled();
      existsSyncMock.mockRestore();
      readFileSyncMock.mockRestore();
      haveRootBindingMock.mockRestore();
    });
  });
});
