/**
 * 资产类型：
 * 在 umi ui 中，类型有两个维度：
 * 1、资源类型 ResourceType ：从资产的来源来分类，目前有 dumi 资产、git 资产、...
 * 2、资产类型 AssetType：从资产中包括的类型，目前是有 component、block、template
 */

// util
export type ValueOf<T> = T[keyof T];

// 原始数据格式
export interface IAssets {
  examples: IAsset[];
}

// 资产类型分组
export type IUIResource = {};

export interface IDumiResourceMeta {
  name: string;
  description: string;
  logo: string;
}

export interface IUIDumiResource extends IDumiResourceMeta {
  blockType: UIAssetType;
  assets: IAsset[];
}

export interface IDumiResource extends IDumiResourceMeta {
  assets: IAssets;
}

export interface IResource extends IDumiResource {
  id: string;
  resourceType: ResourceType;
}

export interface RequestParams {
  keyword?: string;
  current: number;
}

export interface IResourceDumiConifg {
  /** package name from npm */
  name: string;
  /** observe the semver version */
  version?: string;
  /** cdn host */
  registry?: string;
}

export interface IAssetGitConfig {}

export enum ResourceType {
  dumi = 'dumi',
  git = 'git',
}

export type AssetsConfig = { type: ResourceType } & IResourceDumiConifg;

export const PKG_ASSETS_META = 'dumiAssets';

export enum DEPS_TYPE {
  FILE = 'FILE',
  NPM = 'NPM',
}
export type IDepsType = keyof typeof DEPS_TYPE;

export enum UIAssetType {
  component = 'component',
  block = 'block',
  template = 'template',
}
export enum AssetType {
  COMPONENT = 'component',
  BLOCK = 'block',
  TEMPLATE = 'template',
}

export interface IAsset {
  /** 开发者自定义的名称 */
  identifier: string;
  /** 资产名 */
  name?: string;
  'name.en-US'?: string;
  /** 资产简介，例如 帮助开发者快速搭建表单页 */
  symbolId?: string;
  description: string;
  /** 资产类型 */
  type: AssetType;
  /** 资产缩略图 */
  thumbnail: string;
  /** 资产的依赖 */
  dependencies: {
    [key: string]: {
      type: IDepsType;
      value: string;
    };
  };
}

export interface Antd {
  type: Type;
  value: string;
}

export enum Type {
  File = 'FILE',
  Npm = 'NPM',
}

export interface IndexLess {
  type: Type;
  valoue: string;
}
