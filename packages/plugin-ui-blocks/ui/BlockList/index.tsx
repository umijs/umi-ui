import React, { useMemo, useContext, useState, useEffect } from 'react';
import { Empty, Row, Spin, Pagination } from 'antd';
import { Block, AddBlockParams, Resource } from '@umijs/block-sdk/lib/data.d';
import { ResourceType } from '@umijs/block-sdk/lib/enum';

import styles from './index.module.less';
import Context from '../UIApiContext';
import BlockContext from '../components/BlockContext';
import BlockItem from './BlockItem';

interface BlockItemProps {
  type: Resource['blockType'];
  addingBlock?: Block;
  item: Block;
  disabled?: boolean;
  loading?: boolean;
  onShowModal?: (Block: Block, option: AddBlockParams) => void;
  keyword?: string;
}
interface BlockListProps extends Omit<BlockItemProps, 'item'> {
  name?: string;
  selectedTag?: any;
  setSelectedTag?: any;
  list: Block[];
}

const BlockList: React.FC<BlockListProps> = props => {
  const { list = [], setSelectedTag, selectedTag, addingBlock, keyword, loading } = props;
  const { currentResource } = useContext(BlockContext);
  const { api } = useContext(Context);
  const { useIntl } = api;
  const { formatMessage: intl } = useIntl();
  const isMini = api.isMini();
  const pageSize = isMini ? 6 : 8;

  const [currentPage, setCurrentPage] = useState<number>(1);
  useEffect(() => {
    setSelectedTag('');
    setCurrentPage(1);
  }, [list]);
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedTag]);

  /**
   * 筛选区块列表
   */
  const filteredList: Block[] = list.filter(
    ({ name = '', url, description = '', category, tags: listTags = [] }) =>
      (!selectedTag ||
        (category ? category === selectedTag : listTags.join('').includes(selectedTag))) &&
      (!keyword ||
        name.toLocaleLowerCase().includes(keyword) ||
        description.toLocaleLowerCase().includes(keyword) ||
        url.toLocaleLowerCase().includes(keyword)),
  );

  /**
   * 当前的列表项目，区块分页就是在这里做
   */
  const currentPageList: Block[] = filteredList
    .slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize > filteredList.length ? filteredList.length : currentPage * pageSize,
    )
    .filter(Boolean);

  /**
   * 是不是数据为空
   */
  const isEmpty = !currentPageList || currentPageList.length === 0;

  let contents;
  if (loading) {
    contents = (
      <div className={styles.emptyWrapper}>
        <Spin size="large" />
      </div>
    );
  } else if (isEmpty) {
    // 切换为黑色背景图片
    contents = (
      <div className={styles.emptyWrapper}>
        <Empty
          imageStyle={{
            width: 64,
            height: 41,
            margin: '8px auto',
          }}
          image="https://gw.alipayobjects.com/mdn/rms_4f0d74/afts/img/A*LinHSLLEHUAAAAAAAAAAAABkARQnAQ"
          description={
            keyword
              ? intl({ id: 'org.umi.ui.blocks.list.nofound' })
              : intl({ id: 'org.umi.ui.blocks.list.nodata' })
          }
        />
      </div>
    );
  } else {
    contents = (
      <div
        style={{
          display: 'flex',
          height: '100%',
          flexDirection: 'column',
        }}
      >
        <Row gutter={[20, 20]} type="flex">
          {currentPageList.map(item => {
            const blockItemPropsMap = {
              [ResourceType.dumi]: {
                key: item.identifier,
                loading: addingBlock && item.identifier === addingBlock.identifier,
                disabled: addingBlock && item.identifier === addingBlock.identifier,
              },
              default: {
                key: item.url,
                loading: addingBlock && item.url === addingBlock.url,
                disabled: addingBlock && addingBlock.url && item.url !== addingBlock.url,
              },
            };
            return (
              <BlockItem
                {...props}
                {...(blockItemPropsMap[currentResource?.resourceType] || blockItemPropsMap.default)}
                item={item}
                selectedTag={selectedTag}
              />
            );
          })}
        </Row>
        {filteredList.length > pageSize && (
          <Row className={styles.pagination} type="flex" justify="end">
            <Pagination
              size={isMini ? 'small' : undefined}
              current={currentPage}
              onChange={setCurrentPage}
              total={filteredList.length}
              pageSize={pageSize}
            />
          </Row>
        )}
      </div>
    );
  }

  return <div className={styles.cardContainer}>{contents}</div>;
};

export default BlockList;
