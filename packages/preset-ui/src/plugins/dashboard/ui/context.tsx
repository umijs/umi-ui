import { createContext } from 'react';
import { IUiApi } from '@umijs/ui-types';

const UIContext = createContext({} as { api: IUiApi });

export default UIContext;
