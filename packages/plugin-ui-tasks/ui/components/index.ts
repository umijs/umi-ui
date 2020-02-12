import { IUiApi, ITerminal } from '@umijs/ui-types';
import { ITaskDetail } from '../../src/server/core/types';
import { TaskType } from '../../src/server/core/enums';

export interface TaskComponentProps<T = any> {
  api: IUiApi;
  taskType: TaskType;
  detail: ITaskDetail;
  dispatch: any;
  iife: boolean;
  Terminal: ITerminal;
  namespace: string;
  dbPath?: string;
}
