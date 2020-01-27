import { IUiApi, IUi } from "umi-types";
import { ITaskDetail } from "../../src/server/core/types";
import { TaskType } from "../../src/server/core/enums";

export interface TaskComponentProps<T = any> {
  api: IUiApi;
  taskType: TaskType;
  detail: ITaskDetail;
  dispatch: any;
  iife: boolean;
  Terminal: IUi.ITerminal;
  namespace: string;
  dbPath?: string;
}
