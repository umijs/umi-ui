import { createContext, Context } from 'react';
import * as IUi from '@umijs/ui-types';

const UIContext = createContext({} as IUi.IContext);

export default UIContext;
