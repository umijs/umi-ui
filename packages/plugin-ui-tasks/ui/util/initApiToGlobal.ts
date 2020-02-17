import { IUiApi } from '@umijs/ui-types';

let callRemote;
let listenRemote;
let notify;
let intl;
function initApiToGloal(api: IUiApi) {
  callRemote = api.callRemote; // eslint-disable-line
  listenRemote = api.listenRemote;
  notify = api.notify;
  intl = api.getIntl();
}

export { callRemote, listenRemote, notify, intl, initApiToGloal };
