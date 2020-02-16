import { IHandlerOpts } from '../index';

export default async function({ blockService, success, payload }: IHandlerOpts) {
  success({
    data: blockService.retry({ ...payload }),
    success: true,
  });
}
