import { Environment } from './index';

export enum DataSourceType {
  All = 'All',
  UrlParams = 'UrlParams',
  PageVariable = 'PageVariable',
  ApiDataSource = 'ApiDataSource',
}


export type DataSourceItem = PageVariable | ApiDataSource;
export interface PageVariable {
  name: string,
  desc: string,
  expression: string,
  type: DataSourceType.PageVariable | DataSourceType.UrlParams,
}

export interface EnvUrl extends Environment {
  url: string,
}

export interface ApiDataSource {
  name: string,
  desc: string,
  type: DataSourceType.ApiDataSource,
  method: ApiMethod,
  url: string,
  envUrl: EnvUrl[],
  // 响应数据结构 json string
  responseStructure: string,
  // 数据源本身的前置插件
  prePlugin: '',
  // 数据源引用的前置插件
  prePlugins: [],
  // 数据源本身的后置插件
  postPlugin: '',
  // 数据源引用的后置插件
  postPlugins: [],
}

export enum ApiMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}