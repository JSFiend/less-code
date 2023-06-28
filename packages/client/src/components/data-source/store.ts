import qs from 'query-string';
import * as _ from 'lodash-es';
import { cloneDeep, merge, remove } from 'lodash-es';
import { DataSourceItem, DataSourceType } from '~types/data-source';
import { parseExpression } from '@/utils/parse';
import { ElMessageBox } from 'element-plus';
import 'element-plus/theme-chalk/src/message-box.scss'
import 'element-plus/theme-chalk/src/message.scss'

interface State {
  list: DataSourceItem[],
  state: Record<string, any>,
}
export const useDataSource = defineStore('dataSource', {
  state: (): State => {
    return {
      list: [
        {
          name: 'urlParams',
          desc: 'URL 上 querystring 解析后的对象',
          expression: `qs.parse(window.location.search);`,
          type: DataSourceType.UrlParams,
        }
      ],
      state: {},
    };
  },
  actions: {
    addDataSource(dataSource: DataSourceItem) {
      if (this.list.find(item => item.name === dataSource.name)) {
        ElMessage({
          showClose: true,
          message: `数据源变量名 ${dataSource.name} 已存在`,
          type: 'error',
        });
        return false;
      }

      dataSource = cloneDeep(dataSource);
      this.list.push(dataSource);
      this.initState(dataSource);
      ElMessage({
        showClose: true,
        message: `数据源 ${dataSource.name} 添加成功`,
        type: 'success',
      });
    },
    copyDataSource(dataSource: DataSourceItem) {
      dataSource = cloneDeep(dataSource);
      dataSource.name = dataSource.name + 'Copy';
      this.addDataSource(dataSource);
    },
    editDataSource(dataSource: DataSourceItem) {
      const preDataSource = this.list.find(item => item.name === dataSource.name)!;
      merge(preDataSource, dataSource);
      this.initState(preDataSource);
      ElMessage({
        showClose: true,
        message: `数据源 ${dataSource.name} 更新成功`,
        type: 'success',
      });
    },
    deleteDataSource({ name }: DataSourceItem) {
      ElMessageBox.confirm(
        `确定删除数据源 ${name} 吗？`,
        `删除数据源 ${name}`,
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      )
        .then(() => {
          remove(this.list, item => item.name === name);
          delete this.state[name];
          ElMessage({
            type: 'success',
            message: `数据源 ${name} 已被删除`,
          })
        });
    },


    initState({ expression, name }: DataSourceItem): any {
      const context = {
        state: this.state,
        qs,
        _,
      };
      const value = parseExpression(expression, context);
      this.state[name] = value;
    
    },
    init() {
      this.list.forEach((dataSource) => {
        this.initState(dataSource);
      });
    },
  },
});