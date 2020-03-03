import { utils } from 'umi';

const { createDebug } = utils;

const debug = createDebug('umiui:UmiUI');

export const debugSocket = createDebug('socket');
export const debugTerminal = createDebug('terminal');

export default debug;
