import * as React from 'react';
import cls from 'classnames';
import { List, Tag, Typography } from 'antd';
import Context from '../context';
import styles from './dailyReport.module.less';

const { Paragraph } = Typography;
const { useState, useEffect } = React;

const PAGE_SIZE = 5;
const TAG_MAP = {
  发布: 'publish',
  文章: 'article',
  Star: 'star',
  star: 'star',
  Tweets: 'tweets',
};

export const MESSAGES = {
  CHANGE_DAILY_ID: Symbol('CHANGE_DAILY_ID'),
};

const DailyReport: React.SFC<{}> = props => {
  const { forceUpdate } = props;
  const { api } = React.useContext(Context);
  const { _, event, useIntl, hooks } = api;
  const { useRequest } = hooks;
  const intl = useIntl();
  const [size, setSize] = React.useState(PAGE_SIZE);
  const { data } = useRequest('https://cdn.jsdelivr.net/npm/umi-ui-rss/data/index.json');
  const [currentId, setCurrentId] = useState();

  const changeCurrentId = newId => {
    if (newId) {
      setCurrentId(newId);
      setSize(PAGE_SIZE);
    }
  };

  useEffect(() => {
    const id = data?.data?.[0]?.id;
    if (id) {
      setCurrentId(id);
    }
  }, [data?.data]);

  useEffect(() => {
    event.on(MESSAGES.CHANGE_DAILY_ID, changeCurrentId);
    return () => {
      event.off(MESSAGES.CHANGE_DAILY_ID, changeCurrentId);
    };
  }, []);

  console.log('currentId', currentId);
  const { data: detail, loading, run } = useRequest(
    () => `https://cdn.jsdelivr.net/npm/umi-ui-rss/data/detail/${currentId}.json`,
  );

  useEffect(() => {
    if (currentId) {
      run();
      forceUpdate();
    }
  }, [currentId]);

  const length = Array.isArray(detail?.data) ? detail?.data?.length : 0;

  const handleLoadAll = () => {
    // load all
    setSize(length);
    // 重新计算瀑布流
    forceUpdate();
  };

  const LoadMore = size < length && (
    <div
      style={{
        textAlign: 'center',
        marginTop: 12,
        height: 32,
        lineHeight: '32px',
      }}
    >
      <a className={styles.more} onClick={handleLoadAll}>
        {intl.formatMessage({ id: 'org.umi.ui.dashboard.card.zaobao.loadAll' })}
      </a>
    </div>
  );

  const getTagCls = name =>
    cls(styles['listItem-meta-tag'], {
      [styles[`listItem-meta-tag-${TAG_MAP[name] || TAG_MAP.Star}`]]: !!name,
    });

  return (
    <List
      itemLayout="horizontal"
      loading={loading}
      className={styles.list}
      split={false}
      dataSource={Array.isArray(detail?.data) ? detail?.data?.slice(0, size) : detail?.data}
      loadMore={LoadMore}
      renderItem={item =>
        _.isPlainObject(item) && (
          <List.Item className={styles.listItem}>
            <List.Item.Meta
              className={styles['listItem-meta']}
              title={
                <a target="_blank" rel="noopener noreferrer" href={item.href}>
                  <Paragraph className={styles.paragraph} ellipsis>
                    {item.title}
                  </Paragraph>{' '}
                  <Tag className={getTagCls(item.tag)}>{item.tag}</Tag>
                </a>
              }
              description={<Paragraph ellipsis={{ rows: 3 }}>{item.description}</Paragraph>}
            />
          </List.Item>
        )
      }
    />
  );
};

export default DailyReport;
