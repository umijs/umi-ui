import { IApi } from 'umi';

export default (api: IApi) => {
  ['onUISocket', 'addUIPlugin'].forEach(name => {
    api.registerMethod({ name });
  });
};
