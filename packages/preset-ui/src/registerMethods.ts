import { IApi } from '@umijs/types';

export default (api: IApi) => {
  ['onUISocket', 'addUIPlugin'].forEach(name => {
    api.registerMethod({ name });
  });
};
