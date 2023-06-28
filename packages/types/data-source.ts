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

interface EnvUrl extends Environment {
  url: string,
}

export interface ApiDataSource {
  name: string,
  desc: string,
  type: DataSourceType.ApiDataSource,
  method: ApiMethod,
  url: string,
  envUrl: EnvUrl[],
}

export enum ApiMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}