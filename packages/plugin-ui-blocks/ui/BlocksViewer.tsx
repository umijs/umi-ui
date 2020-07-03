import React, { useState, useEffect, useMemo, useLayoutEffect } from 'react';
import { Spin, Radio, Button, message, Tooltip } from 'antd';
import { ReloadOutlined, PlusOutlined } from '@ant-design/icons';
import { IUiApi } from '@umijs/ui-types';
import { ResourceType } from '@umijs/block-sdk/lib/enum';
import { Resource, Block, AddBlockParams } from '@umijs/block-sdk/lib/data.d';
import { stringify, parse } from 'qs';

import { Clear } from './icon';
import BlockList from './BlockList';
import GlobalSearch from './GlobalSearch';
import BlockContext from './components/BlockContext';
import styles from './BlocksViewer.module.less';
import Adder from './Adder';
import AssetsMenu from './AssetsMenu';
import Container from './Container';

/**
 * get substr from url
 */
const getQueryConfig = () => parse(window.location.search.substr(1));

/**
 *  更新 search
 * @param params
 */
const updateUrlQuery = (params: { type: string; resource?: string }) => {
  const defaultParas = getQueryConfig();
  window.history.pushState(
    {},
    '',
    `?${stringify({
      ...defaultParas,
      ...params,
    })}`,
  );
};

const clearCache = async (api: IUiApi) => {
  try {
    const hide = message.loading('缓存清理中！');
    const { data } = (await api.callRemote({
      type: 'org.umi.block.clear',
    })) as {
      data: string;
    };

    // 用户记忆的参数
    localStorage.removeItem('umi-ui-block-removeLocale');
    hide();
    // 等动画播放完
    setTimeout(() => {
      message.success(data);
    }, 30);
  } catch (e) {
    message.error(e.message);
  }
};

const openUmiBlocks = () => {
  window.open('https://github.com/umijs/umi-blocks');
};

/**
 * 从 id 的 dom 滚动到 target 的 dom
 * @param id
 * @param target
 */
export const scrollToById = (id: string, target: string) => {
  const dom = document.getElementById(id);
  const targetDom = document.getElementById(target);
  if (dom && targetDom) {
    const axis = dom.getBoundingClientRect();
    targetDom.scrollTop = axis.top + axis.height / 2;
  }
};

interface Props {}

/**
 * 渲染 数据源选择器
 * @param param0
 */
const renderActiveResourceTag = ({
  type,
  matchedResources = [],
  current = { id: '' },
  setActiveResource,
}: {
  type: string;
  current: Resource;
  matchedResources: Resource[];
  setActiveResource: (value: Resource) => void;
}) => {
  if (matchedResources.length > 1) {
    return (
      <Radio.Group
        value={current.id}
        size="small"
        onChange={e => {
          const resource = matchedResources.find(r => r.id === e.target.value);
          setActiveResource(resource);
          updateUrlQuery({ type, resource: resource.id });
        }}
      >
        {matchedResources.map(r => (
          <Radio.Button key={r.id} value={r.id}>
            {r.name}
          </Radio.Button>
        ))}
      </Radio.Group>
    );
  }
  if (matchedResources.length === 1) {
    return (
      <h3
        style={{
          marginTop: 8,
        }}
      >
        {matchedResources[0].name}
      </h3>
    );
  }
  return null;
};

/**
 * 资产 主入口
 * @param props
 */
const BlocksViewer: React.FC<Props> = () => {
  const { api, type, setType, activeResource, setActiveResource } = Container.useContainer();
  const { callRemote, useIntl, hooks } = api;
  const { useRequest } = hooks;
  const { formatMessage: intl } = useIntl();
  /**
   * 是不是 mini
   */
  const isMini = api.isMini();

  /**
   * 用到的各种状态
   */
  const [willAddBlock, setWillAddBlock] = useState<Block>(null);
  const [addingBlock, setAddBlock] = useState<Block>(null);
  const [addModalVisible, setAddModalVisible] = useState<boolean>(false);
  const [blockParams, setBlockParams] = useState<AddBlockParams>(null);
  const [searchValue, setSearchValue] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string>('');
  const [blockData, setBlockData] = useState({});

  // 获取资产数据源
  const { data: resources, error, loading: fetchResourceLoading } = useRequest(
    () =>
      callRemote({
        type: 'org.umi.block.resource',
      }),
    {
      cacheKey: 'getResources',
      formatResult: res => res?.data || [],
      initialData: [],
    },
  );

  // 当前的数据源列表
  const current = activeResource || resources.filter(item => item.blockType === type)[0];

  // 请求资产列表
  const { loading: fetchDataLoading, run } = useRequest(
    async () => {
      const { id: resourceId } = current;
      const resource = resources.find(r => r.id === resourceId);
      if (resource?.resourceType === ResourceType.dumi && resource.assets) {
        return {
          [resourceId]: resource.assets,
        };
      }
      const { data: list } = await callRemote({
        type: 'org.umi.block.list',
        payload: {
          resourceId,
          force: false,
        },
      });
      return {
        [resourceId]: list,
      };
    },
    {
      cacheKey: 'getAssetsList',
      refreshDeps: [current, resources],
      formatResult: res => res,
      onSuccess: data => {
        setBlockData(prevData => ({
          ...prevData,
          ...data,
        }));
      },
      initialData: {},
    },
  );

  /**
   * 获取 query 中的设置
   */
  useLayoutEffect(() => {
    // 更新一下url，让他们同步一下
    if (type) {
      updateUrlQuery({ type });
    }
  }, []);

  // 计算选中的区块
  const blocks = useMemo<Block[]>(
    () => (current && blockData[current.id] ? blockData[current.id] : []),
    [blockData, current],
  );

  useEffect(() => {
    const handleMessage = event => {
      try {
        const { action, payload = {} } = JSON.parse(event.data);
        switch (action) {
          // postMessage，ui 与项目的通讯
          case 'umi.ui.block.addTemplate': {
            setWillAddBlock(undefined);
            setBlockParams(undefined);
            if (payload) {
              setType('template');
              onShowModal(payload, {});
            }
            break;
          }
          default:
          // no thing
        }
      } catch (_) {
        // no thing
      }
      return false;
    };
    window.addEventListener('message', handleMessage, false);
    // 告知父级页面，资产 准备就绪
    window.parent.postMessage(
      JSON.stringify({
        action: 'umi.ui.block.addTemplate.ready',
      }),
      '*',
    );
    return () => {
      window.removeEventListener('message', handleMessage, false);
    };
  }, []);

  // 如果区块不在屏幕范围内，滚动过去
  useEffect(() => {
    if (willAddBlock) {
      // 我把每个 item 都加了一个 id，就是他的 url
      scrollToById(willAddBlock.url, 'block-list-view');
    }
  }, [fetchDataLoading]);

  // 区块右上角的区域 三个按钮
  useEffect(() => {
    const buttonPadding = isMini ? '0 4px' : '0 8px';

    const handleSearchChange = (v: string) => {
      setSearchValue(v.toLocaleLowerCase());
    };

    if (api.setActionPanel) {
      api.setActionPanel(() => [
        <GlobalSearch key="global-search" onChange={handleSearchChange} api={api} />,
        <Tooltip
          title={intl({ id: 'org.umi.ui.blocks.actions.reload' })}
          getPopupContainer={node => (node ? (node.parentNode as HTMLElement) : document.body)}
          placement="bottom"
        >
          <Button
            size={isMini ? 'small' : 'default'}
            key="reload"
            style={{ padding: buttonPadding }}
            onClick={() => run()}
          >
            <ReloadOutlined />
          </Button>
        </Tooltip>,
        <Tooltip
          title={intl({ id: 'org.umi.ui.blocks.actions.clear' })}
          getPopupContainer={node => (node ? (node.parentNode as HTMLElement) : document.body)}
          placement="bottom"
        >
          <Button
            size={isMini ? 'small' : 'default'}
            key="clear"
            onClick={() => clearCache(api)}
            style={{
              padding: buttonPadding,
            }}
          >
            <Clear />
          </Button>
        </Tooltip>,
        <Tooltip
          title={intl({ id: 'org.umi.ui.blocks.actions.submit' })}
          getPopupContainer={node => (node ? (node.parentNode as HTMLElement) : document.body)}
          placement="bottom"
        >
          <Button
            size={isMini ? 'small' : 'default'}
            key="clear"
            onClick={() => openUmiBlocks()}
            style={{
              padding: buttonPadding,
            }}
          >
            <PlusOutlined />
          </Button>
        </Tooltip>,
      ]);
    }
  }, [current]);

  const onShowModal = (currentBlock, option) => {
    setAddModalVisible(true);
    setWillAddBlock(currentBlock);
    setBlockParams(option);
  };

  const onHideModal = () => {
    setAddModalVisible(false);
    setWillAddBlock(undefined);
    setBlockParams(undefined);
  };

  const matchedResources = resources.filter(r => r.blockType === type);
  const currentResource = resources.find(r => r.id === current?.id);
  const loading = fetchResourceLoading === true || fetchDataLoading === true;

  return (
    <BlockContext.Provider
      value={{
        current,
        resources,
        ResourceType,
        currentResource,
      }}
    >
      <div className={styles.wrapper}>
        <div className={styles.side}>
          <AssetsMenu
            type={type}
            matchedResources={matchedResources}
            setActiveResource={setActiveResource}
            updateUrlQuery={updateUrlQuery}
            setSelectedTag={setSelectedTag}
            selectedTag={selectedTag}
            current={current}
            blocks={blocks}
            loading={loading}
          />
        </div>
        <div className={styles.main}>
          <div className={`${styles.container} ${isMini && styles.min}`} id="block-list-view">
            {current ? (
              <div className={styles.blockList}>
                {matchedResources.length > 0 && (
                  <BlockList
                    type={type}
                    keyword={searchValue}
                    addingBlock={willAddBlock || addingBlock}
                    list={blocks}
                    current={current}
                    setSelectedTag={setSelectedTag}
                    selectedTag={selectedTag}
                    onShowModal={onShowModal}
                    loading={loading}
                  />
                )}
                {!loading && !matchedResources?.length && <div>没有找到数据源</div>}
              </div>
            ) : (
              <div className={styles.loading}>
                <Spin />
              </div>
            )}
          </div>
        </div>
      </div>
      <Adder
        block={willAddBlock}
        blockType={type}
        {...blockParams}
        visible={addModalVisible}
        onAddBlockChange={addBlock => setAddBlock(addBlock)}
        onHideModal={onHideModal}
      />
    </BlockContext.Provider>
  );
};

export default BlocksViewer;
