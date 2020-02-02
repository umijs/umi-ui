import { createContext } from 'react';
import * as IUi from '@umijs/ui-types';
import { IProjectStatus } from '@/enums';

export interface IProjectContext extends IUi.IContext {
  current: IProjectStatus;
  currentData?: object;
  setCurrent: (current: IProjectStatus, payload?: object) => void;
}

const ProjectContext = createContext({} as IProjectContext);

export default ProjectContext;
