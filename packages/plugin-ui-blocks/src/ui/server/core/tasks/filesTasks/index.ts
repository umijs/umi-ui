import parseUrl from './parse_url';
import install from './install';
import runGenerator from './run_generator';
import writeRoutes from './write_routes';

/**
 * files: {},
 * dependencies: {},
 * devDependencies: {}
 *
 * 1、解析 files，
 * 2、依赖处理，处理依赖冲突、依赖安装、依赖写入
 * 3、写 files 到项目目录中
 * 4、写路由
 */
export default [
  { name: 'parseUrl', task: parseUrl },
  { name: 'install', task: install },
  { name: 'runGenerator', task: runGenerator },
  { name: 'writeRoutes', task: writeRoutes },
];
