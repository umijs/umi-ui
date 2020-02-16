import { IHandlerOpts } from '../index';

export default async function({ blockService, success }: IHandlerOpts) {
  const routers = await blockService.depthRouterConfig();
  success({
    data: routers,
    success: true,
  });
}
