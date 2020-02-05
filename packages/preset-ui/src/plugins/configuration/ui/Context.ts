import { createContext } from 'react';
import { IUiApi } from 'umi-types';
import * as IUi from '@umijs/ui-types';

const UIContext = createContext({} as { api: IUiApi; theme: IUi.ITheme });

export default UIContext;
