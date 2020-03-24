import { IApi } from 'umi';
import { Resource } from '@umijs/block-sdk/lib/data.d';
import {
  routeExists,
  depthRouterConfig,
  genRouterToTreeData,
  reduceData,
  genComponentToTreeData,
} from '@umijs/block-sdk';
import Flow from './Flow';
import { FlowState } from './enum';

import { getFolderTreeData, getBlockList, getFilesTreeData } from '../util';

class Block {
  public api: IApi;
  public flow: Flow;
  public send;
  public initFlag: boolean = false;

  constructor(api: IApi) {
    this.api = api;
  }

  public async run(args) {
    this.flow = new Flow({
      api: this.api,
      args,
    });
    this.flow.on('log', ({ data }) => {
      this.send({
        type: 'org.umi.block.add-blocks-log',
        payload: {
          data,
          id: this.flow.logger.id,
          success: true,
        },
      });
    });

    this.flow.on('state', ({ state, data }) => {
      this.send({
        type:
          state === FlowState.SUCCESS
            ? 'org.umi.block.add-blocks-success'
            : 'org.umi.block.add-blocks-fail',
        payload: {
          id: this.flow.logger.id,
          data,
          success: true,
        },
      });
    });

    return this.flow.run(args);
  }

  public async cancel() {
    if (!this.flow) {
      return;
    }
    this.flow.cancel();
  }

  public async retry(args) {
    if (!this.flow) {
      return null;
    }
    return this.flow.retry(args);
  }

  public getLog() {
    if (!this.flow) {
      return '';
    }
    return this.flow.getLog();
  }

  /**
   * 获取 page 下的目录结构
   */
  public getFolderTreeData() {
    const folderTreeData = getFolderTreeData(this.api.paths.absPagesPath);
    folderTreeData.unshift({
      title: '/',
      value: '/',
      key: '/',
    });
    return folderTreeData;
  }

  /**
   * 获取路由结构
   */
  public async depthRouterConfig() {
    const routes = await this.api.getRoutes();
    return depthRouterConfig(reduceData(genRouterToTreeData(routes)));
  }

  /**
   * 获取路由的结构，但是获取 component
   */
  public async depthRouteComponentConfig() {
    const routes = await this.api.getRoutes();
    return depthRouterConfig(reduceData(genComponentToTreeData(routes)));
  }

  /**
   * 获取 page 下的目录结构
   * 包含文件
   */
  public getFilesTreeData() {
    return getFilesTreeData(this.api.paths.absPagesPath);
  }

  public async getBlockList(resourceId: string, list: Resource[]) {
    return getBlockList(resourceId, list);
  }

  public async routeExists(path: string) {
    const routes = await this.api.getRoutes();
    return routeExists(path, routes);
  }

  public getBlockUrl() {
    if (this.flow) {
      return this.flow.getBlockUrl();
    }
    return '';
  }

  public hasRunningFlow(): boolean {
    if (!this.flow) {
      return false;
    }
    return this.flow.state === FlowState.ING;
  }

  public init(send) {
    if (this.initFlag) {
      return;
    }
    this.send = send;
    this.initFlag = true;
  }
}

export default Block;
