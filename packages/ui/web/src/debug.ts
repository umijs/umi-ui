import createDebug from 'debug';

export enum DEBUG {
  UmiUI = 'umiui',
  BaseUI = 'BaseUI',
  UIPlugin = 'UIPlugin',
}

console.log('createDebug', createDebug);

const uiDebug = createDebug(DEBUG.UmiUI);

export const pluginDebug = uiDebug.extend(DEBUG.UIPlugin);

export default uiDebug.extend(DEBUG.BaseUI);
