import { utils } from 'umi';
import { isAbsolute, join } from 'path';

const { lodash, winPath } = utils;

export const getRouteComponents = ({ componentRoutes, paths, cwd }): string[] => {
  const getComponents = routes =>
    routes.reduce((memo, route) => {
      if (
        route.component &&
        typeof route.component === 'string' &&
        !route.component.startsWith('(') &&
        !route.component?.includes('node_modules')
      ) {
        const routeComponent = route.component
          ?.replace('@@', paths.absTmpPath)
          ?.replace('@', paths.absSrcPath);
        const component = isAbsolute(routeComponent)
          ? require.resolve(routeComponent)
          : require.resolve(join(cwd, routeComponent));
        memo.push(winPath(component));
      }
      if (route.routes) {
        memo = memo.concat(getComponents(route.routes));
      }
      return memo;
    }, []);

  return lodash.uniq(getComponents(componentRoutes));
};
