import { IHandlerOpts } from '../index';

export default async function({ blockService, success }: IHandlerOpts) {
  const data = await blockService.depthRouteComponentConfig();
  success({
    data,
    success: true,
  });
}
