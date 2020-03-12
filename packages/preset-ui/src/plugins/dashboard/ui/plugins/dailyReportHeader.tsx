import * as React from 'react';
import { Select } from 'antd';
import { MESSAGES } from './dailyReport';
import Context from '../context';
import styles from './dailyReport.module.less';

const DailyReportHeader: React.SFC<{}> = props => {
  const { api } = React.useContext(Context);
  const { event, moment, hooks } = api;
  const { useRequest } = hooks;
  const { data } = useRequest('https://cdn.jsdelivr.net/npm/umi-ui-rss/data/index.json');

  const handleOnChange = value => {
    event.emit(MESSAGES.CHANGE_DAILY_ID, value);
  };

  return (
    <div className={styles['select-wrapper']}>
      {Array.isArray(data?.data) && (
        <Select
          className={styles.select}
          defaultValue={data?.data?.[0]?.id}
          onChange={handleOnChange}
        >
          {(data?.data || []).map(item => (
            <Select.Option key={`${item.id}`} value={item.id}>
              {moment(item.createdAt).format('YYYY-MM-DD')}
            </Select.Option>
          ))}
        </Select>
      )}
    </div>
  );
};

export default DailyReportHeader;
