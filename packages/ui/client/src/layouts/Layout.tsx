import React from 'react';
import { FormattedMessage, setLocale, useIntl, addLocale } from 'umi';
import Helmet from 'react-helmet';
import moment from 'moment';
import cls from 'classnames';
import ErrorBoundary from '@/components/ErrorBoundary';
import event, { MESSAGES } from '@/message';
import { isMiniUI, getLocale } from '@/utils/index';
import Context from './Context';
import Footer from './Footer';
import { ILocale, LOCALES } from '../enums';

interface ILayoutProps {
  /** Layout 类型（项目列表、项目详情，loading 页） */
  type: 'detail' | 'list' | 'loading';
  className?: string;
  title?: string;
}

const Layout: React.FC<ILayoutProps> = props => {
  const isMini = isMiniUI();
  const [loaded, setLoaded] = React.useState(false);
  const [theme, setTheme] = React.useState('dark');

  const setMomentLocale = (locale: ILocale = getLocale()) => {
    moment.locale(locale === 'zh-CN' ? 'zh-cn' : 'en');
  };

  React.useEffect(() => {
    const messages = window.g_service.locales.reduce((curr, acc) => {
      const localeGroup = Object.entries(acc);
      localeGroup.forEach(group => {
        const [lang, message] = group;
        curr[lang] = { ...curr[lang], ...message };
      });
      return curr;
    }, {});

    Object.keys(messages).forEach((locale: string) => {
      addLocale(locale, messages[locale]);
    });
    setLoaded(true);
  }, []);

  React.useLayoutEffect(() => {
    setMomentLocale();
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

  const setGlobalLocale = (locale: ILocale, reload = false) => {
    if (Object.keys(LOCALES).indexOf(locale as string) > -1) {
      setLocale(locale, reload);
      setMomentLocale(locale);
    }
  };
  const locale = getLocale();
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

  return (
    <div className={layoutCls}>
      <Context.Provider
        value={{
          locale,
          theme,
          loaded,
          isMini,
          currentProject,
          showLogPanel,
          hideLogPanel,
          setLocale: setGlobalLocale,
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
  );
};

export default Layout;
