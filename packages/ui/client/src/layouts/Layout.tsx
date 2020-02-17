import React from 'react';
import immer from 'immer';
import { ConfigProvider } from 'antd';
import { RawIntlProvider, createIntl, FormattedMessage } from 'react-intl';
import Helmet from 'react-helmet';
import moment from 'moment';
import cls from 'classnames';
import 'moment/locale/zh-cn';
import ErrorBoundary from '@/components/ErrorBoundary';
import event, { MESSAGES } from '@/message';
import { isMiniUI, getLocale } from '@/utils';
import Context from './Context';
import Footer from './Footer';
import { getLocaleInfo, setLocaleInfo } from '../PluginAPI';
import { ILocale, LOCALES } from '../enums';

moment.locale('en');

const { useState, useEffect, useLayoutEffect, useMemo } = React;

interface ILayoutProps {
  /** Layout 类型（项目列表、项目详情，loading 页） */
  type: 'detail' | 'list' | 'loading';
  className?: string;
  title?: string;
}

const Layout: React.FC<ILayoutProps> = props => {
  const isMini = isMiniUI();
  const localeInfo = getLocaleInfo();
  const [locale, setLocale] = useState<'zh-CN', 'en-US'>(() => getLocale());
  const [intl, setIntl] = useState(() => createIntl(localeInfo[locale]));
  const [theme, setTheme] = useState('dark');

  const currentLocaleInfo = localeInfo[locale];

  useLayoutEffect(() => {
    const messages = window.g_service.locales.reduce((curr, acc) => {
      const localeGroup = Object.entries(acc);
      localeGroup.forEach(group => {
        const [lang, message] = group;
        curr[lang] = { ...curr[lang], ...message };
      });
      return curr;
    }, {});
    const newLocaleInfo = immer(localeInfo, draft => {
      draft[locale].messages = {
        ...draft[locale].messages,
        ...messages[locale],
      };
    });
    setIntl(createIntl(newLocaleInfo[locale]));
    setLocaleInfo(newLocaleInfo);
    moment.locale(newLocaleInfo[locale]?.moment);
    return () => {
      event.removeAllListeners();
    };
  }, []);

  const showLogPanel = () => {
    if (event) {
      event.emit(MESSAGES.SHOW_LOG);
    }
  };

  const hideLogPanel = () => {
    if (event) {
      event.emit(MESSAGES.HIDE_LOG);
    }
  };

  const { type, className, title } = props;
  const currentProject = window.g_uiCurrentProject || {};
  const layoutCls = cls(
    locale,
    'ui-layout',
    {
      isMini: !!isMini,
    },
    className,
  );
  window.g_uiContext = Context;
  const { basicUI } = window.g_service;
  const frameworkName = basicUI.name || 'Umi';
  const framework = `${frameworkName} UI`;
  const icon = basicUI.logo_remote || '//gw.alipayobjects.com/zos/antfincdn/KjbXlRsRBz/umi.png';
  debugger;

  return (
    <RawIntlProvider value={intl}>
      <ConfigProvider locale={currentLocaleInfo?.antd}>
        <div className={layoutCls}>
          <Context.Provider
            value={{
              locale,
              theme,
              isMini,
              currentProject,
              showLogPanel,
              hideLogPanel,
              setLocale,
              formatMessage: intl.formatMessage,
              FormattedMessage,
              basicUI,
            }}
          >
            <Helmet>
              <html lang={locale === 'zh-CN' ? 'zh' : 'en'} />
              <title>Umi UI</title>
              <link rel="shortcut icon" href={icon} type="image/x-icon" />
            </Helmet>
            <ErrorBoundary>{props.children}</ErrorBoundary>
            <ErrorBoundary>
              <Footer type={type} />
            </ErrorBoundary>
          </Context.Provider>
        </div>
      </ConfigProvider>
    </RawIntlProvider>
  );
};

export default Layout;
