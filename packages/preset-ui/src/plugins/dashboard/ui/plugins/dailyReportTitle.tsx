import React from 'react';
import Context from '../context';
import styles from './dailyReport.module.less';

const DailyReportTitle = () => {
  const { api } = React.useContext(Context);
  const intl = api.useIntl();

  return (
    <a
      className={styles.title}
      target="_blank"
      rel="noopener noreferrer"
      href="https://github.com/sorrycc/zaobao/issues"
    >
      {intl.formatMessage({ id: 'org.umi.ui.dashboard.card.zaobao' })}
    </a>
  );
};

export default DailyReportTitle;
