import React from 'react';
import { Menu, Dropdown } from 'antd';
import { ExperimentFilled } from '@ant-design/icons';
import { NavLink } from 'umi';
import { useIntl, FormattedMessage } from 'react-intl';
import styles from './Dashboard.less';

export interface BetaPluginProps {
  betaPanels: any[];
  overlay: any;
  selectedKeys: string[];
  isMini: boolean;
  search: string;
}

const BetaPlugin: React.SFC<BetaPluginProps> = props => {
  const { betaPanels = [], overlay, selectedKeys, isMini, search } = props;
  const intl = useIntl();

  return (
    <>
      {Array.isArray(betaPanels) && betaPanels.length > 0 && (
        <div className={styles['sidebar-lab']}>
          {isMini ? (
            <Menu
              theme="light"
              selectedKeys={selectedKeys}
              style={{
                border: 0,
              }}
              selectable={false}
              mode="inline"
            >
              <Menu.SubMenu
                key="lab_subMenu"
                title={
                  <span>
                    <ExperimentFilled className={styles.menuIcon} />
                    <p>
                      <FormattedMessage id="org.umi.ui.global.dashboard.lab" />
                    </p>
                  </span>
                }
              >
                {betaPanels.map((panel, i) => (
                  <Menu.Item key={panel.path}>
                    <NavLink exact to={`${panel.path}${search}`}>
                      {React.cloneElement(panel.icon, {
                        className: styles.menuIcon,
                      })}
                      <span style={{ marginLeft: 8 }} className={styles.menuItem}>
                        {intl.formatMessage(panel.title)}
                      </span>
                    </NavLink>
                  </Menu.Item>
                ))}
              </Menu.SubMenu>
            </Menu>
          ) : (
            <Dropdown
              overlay={overlay}
              placement="topLeft"
              getPopupContainer={node => node.parentNode}
            >
              <Menu
                theme="light"
                style={{
                  border: 0,
                }}
                selectable={false}
                mode="inline"
              >
                <Menu.Item>
                  <ExperimentFilled className={styles.menuIcon} />
                  <span className={styles.menuItem}>
                    <FormattedMessage id="org.umi.ui.global.dashboard.lab" />
                  </span>
                </Menu.Item>
              </Menu>
            </Dropdown>
          )}
        </div>
      )}
    </>
  );
};

export default BetaPlugin;
