import React from 'react';
import { IUiApi } from '@umijs/ui-types';

import Context from './UIApiContext';
import BlocksViewer from './BlocksViewer';
import TitleTab from './TitleTab';
import Icon from './icon';
import zhCN from './locales/zh-CN';
import enUS from './locales/en-US';
import Container from './Container';

export default (api: IUiApi) => {
  api.addLocales({
    'zh-CN': zhCN,
    'en-US': enUS,
  });

  api.addPanel({
    title: 'org.umi.ui.blocks.content.title',
    headerTitle: <TitleTab />,
    provider: ({ children, ...restProps }) => (
      <Container.Provider initialState={{ api }} {...restProps}>
        {children}
      </Container.Provider>
    ),
    path: '/blocks',
    icon: <Icon />,
    actions: [],
    component: () => (
      <Context.Provider
        value={{
          api,
        }}
      >
        <BlocksViewer />
      </Context.Provider>
    ),
  });
};
