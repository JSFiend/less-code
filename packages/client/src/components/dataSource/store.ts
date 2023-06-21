import qs from 'query-string';
export const useDataSource = defineStore('dataSource', {
  state: () => {
    return {
      list: [
        {
          name: 'urlParams',
          desc: 'URL 上 querystring 解析后的对象',
          value: qs.parse(window.location.search),
        }
      ],
    }
  }
})