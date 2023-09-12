import { Environment } from './index';

export enum DataSourceType {
  All = 'All',
  DefaultData = 'DefaultData',
  PageVariable = 'PageVariable',
  ApiDataSource = 'ApiDataSource',
}


export type DataSourceItem = PageVariable | ApiDataSource;

export interface DefaultData {
  name: string,
  desc: string,
  expression: string,
  type: DataSourceType.DefaultData,
}
export interface PageVariable {
  name: string,
  desc: string,
  expression: string,
  type: DataSourceType.PageVariable,
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
  // 请求参数
  params: Record<string, any>,
  // 响应数据结构 json string
  response: Record<string, any>,
  // 数据源本身的前置插件
  prePlugin: string,
  // 数据源引用的前置插件
  prePlugins: [],
  // 数据源本身的后置插件
  postPlugin: string,
  // 数据源引用的后置插件
  postPlugins: [],
}

export enum ApiMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}