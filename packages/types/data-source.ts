export enum DataSourceType {
  All = 'All',
  UrlParams = 'UrlParams',
  PageVariable = 'PageVariable',
  InterfaceDataSource = 'InterfaceDataSource',
}
export interface DataSourceItem {
  name: string,
  desc: string,
  expression: string,
  type: DataSourceType,
}