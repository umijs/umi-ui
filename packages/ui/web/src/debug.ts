import { utils } from 'umi';

const { createDebug } = utils;

export enum DEBUG {
  UmiUI = 'umiui',
  BaseUI = 'BaseUI',
  UIPlugin = 'UIPlugin',
}

const uiDebug = createDebug(DEBUG.UmiUI);

export const pluginDebug = uiDebug.extend(DEBUG.UIPlugin);

export default uiDebug.extend(DEBUG.BaseUI);
