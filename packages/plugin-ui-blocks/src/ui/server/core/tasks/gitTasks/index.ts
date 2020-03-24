import parseUrl from './parse_url';
import gitClone from './git_clone';
import gitUpdate from './git_update';
import install from './install';
import runGenerator from './run_generator';
import writeRoutes from './write_routes';

/**
 * git 类型的流程是：
 * 1、解析 url => git 地址
 * 2、如果不存在，则 git clone 到本地临时目录
 * 3、git pull 更新到最新分支
 * 4、依赖处理，处理依赖冲突、依赖安装、依赖写入
 * 5、写区块到项目目录中
 * 6、写路由
 */
export default [
  { name: 'parseUrl', task: parseUrl },
  { name: 'gitClone', task: gitClone },
  { name: 'gitUpdate', task: gitUpdate },
  { name: 'install', task: install },
  { name: 'runGenerator', task: runGenerator },
  { name: 'writeRoutes', task: writeRoutes },
];
