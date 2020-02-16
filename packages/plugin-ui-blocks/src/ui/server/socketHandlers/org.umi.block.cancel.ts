import { IHandlerOpts } from '../index';

export default async function({ blockService, success }: IHandlerOpts) {
  success({
    data: blockService.cancel(),
    success: true,
  });
}
