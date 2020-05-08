import { IUiApi } from '@umijs/ui-types';
import { ResourceType } from '@umijs/block-sdk';
import { Block } from '@umijs/block-sdk/lib/data.d';

export const namespace = 'org.umi.block';

let callRemote;

export function initApiToGlobal(api: IUiApi) {
  // eslint-disable-next-line
  callRemote = api.callRemote;
}

export interface ModelState {
  blockData: {
    [resourceId: string]: Block[];
  };
  currentResourceId?: string;
}

export default {
  namespace,
  // TODO fill state
  state: {
    blockData: {},
    currentResourceId: null,
  },
  effects: {
    // 获取数据
    *fetch({ payload }, { call, put, select }) {
      const { blockData, currentResourceId } = yield select(state => state[namespace]);
      const { resourceId = currentResourceId, reload, current } = payload;
      // 缓存 cache
      if (blockData[resourceId] && !reload) {
        return blockData[resourceId];
      }
      // 如果是 dumi 不需要再请求资源
      if (current?.type === ResourceType.dumi && current.assets) {
        yield put({
          type: 'saveData',
          payload: {
            resourceId,
            list: current.assets,
          },
        });
        return [];
      }
      const { data: list } = yield call(() =>
        callRemote({
          type: 'org.umi.block.list',
          payload: {
            resourceId,
            force: reload,
          },
        }),
      );
      yield put({
        type: 'saveData',
        payload: {
          resourceId,
          list,
        },
      });
      return [];
    },
  },
  reducers: {
    saveData({ blockData }, { payload }) {
      const { resourceId, list } = payload;
      const newState = {
        blockData: {
          ...blockData,
          [resourceId]: list,
        },
        currentResourceId: resourceId,
      };
      return newState;
    },
  },
};
