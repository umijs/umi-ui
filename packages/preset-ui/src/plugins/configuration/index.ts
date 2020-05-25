import { IApi } from 'umi';

export default function(api: IApi) {
  api.addUIPlugin(() => require.resolve('../../../dist/configuration.umd'));

  api.onUISocket(async ({ action, failure, success }) => {
    const { type, payload, lang } = action;
    switch (type) {
      case 'org.umi.config.list':
        console.log('api.config', api.config);
        const properties = Object.keys(api.service.plugins);
        console.log('service.plugins', properties);
        const data = [];
        success({
          data,
        });
        break;
      case 'org.umi.config.edit':
        let config = payload.key;
        if (typeof payload.key === 'string') {
          config = {
            [payload.key]: payload.value,
          };
        }
        try {
          validateConfig(config);
          // TODO:
          // api.service.runCommand('config', {
          //   _: ['set', config],
          // });
          success();
        } catch (e) {
          failure({
            message: e.message,
            errors: e.errors,
          });
        }
        break;
      default:
        break;
    }
  });
}
