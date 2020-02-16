import { IHandlerOpts } from '../index';

export default function({ blockService, success }: IHandlerOpts) {
  success({
    data: blockService.getBlockUrl(),
    success: true,
  });
}
