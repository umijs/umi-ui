import { IHandlerOpts } from '../index';

export default function({ blockService, success }: IHandlerOpts) {
  const routers = blockService.depthRouterConfig();
  success({
    data: routers,
    success: true,
  });
}
