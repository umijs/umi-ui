import { createContext } from 'react';
import { IUiApi } from '@umijs/ui-types';

const UIApiContext = createContext({} as { api: IUiApi });

export default UIApiContext;
