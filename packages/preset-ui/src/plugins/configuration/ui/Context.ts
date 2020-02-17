import { createContext } from 'react';
import { IUiApi, ITheme } from '@umijs/ui-types';

const UIContext = createContext({} as { api: IUiApi; theme: ITheme });

export default UIContext;
