export default async function({ blockService, success }) {
  const data = await blockService.depthRouteComponentConfig();
  success({
    data,
    success: true,
  });
}
