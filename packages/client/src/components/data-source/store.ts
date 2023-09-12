import qs from 'query-string';
import * as _ from 'lodash-es';
import { cloneDeep, merge, remove } from 'lodash-es';
import {
  ApiDataSource,
  DataSourceType,
  PageVariable,
  DefaultData,
} from '~types/data-source';
import { parseExpression } from '@/utils/parse';
import { ElMessageBox } from 'element-plus';
import 'element-plus/theme-chalk/src/message-box.scss';
import 'element-plus/theme-chalk/src/message.scss';

export const useDataSource = defineStore('dataSource', () => {
  // 默认数据
  const defaultDataList = ref<DefaultData[]>([
    {
      name: 'urlParams',
      desc: 'URL 上 querystring 解析后的对象',
      // expression: `console.log(route);return route.query`,
      expression: `route.query`,
      type: DataSourceType.DefaultData,
    },
  ]);

  // 页面变量
  const pageVariableList = ref<PageVariable[]>([]);

  // api 数据源
  const apiDataSourceList = ref<ApiDataSource[]>([]);

  // 所有数据
  const state = reactive<Record<string, any>>({});

  // 当前打开的数据源 tabs
  const currentDataSourceTab = ref(DataSourceType.DefaultData);

  // 是否打开数据源面板
  const isOpenDataSourcePanel = ref(false);

  // 初始化默认数据值
  watch(
    defaultDataList,
    (list) => {
      list.forEach(({ expression, name }) => {
        const value = parseExpression(expression);
        console.log('express', expression, name, value);
        state[name] = value;
      });
    },
    {
      immediate: true,
    }
  );

  // 初始化页面变量的值
  watch(
    pageVariableList,
    (list) => {
      list.forEach(({ expression, name }) => {
        const value = parseExpression(expression);
        state[name] = value;
      });
    },
    {
      immediate: true,
      deep: true,
    }
  );

  /**
   * 添加页面变量
   * @param pageVariable
   * @returns
   */
  function addPageVariable(pageVariable: PageVariable) {
    if (state[pageVariable.name]) {
      ElMessage({
        showClose: true,
        message: `已存在 ${pageVariable.name} 页面变量名或者数据源变量名`,
        type: 'error',
      });
      return false;
    }
    // 脱离表单的内容
    pageVariable = cloneDeep(pageVariable);
    pageVariableList.value.push(pageVariable);
    ElMessage({
      showClose: true,
      message: `页面变量 ${pageVariable.name} 添加成功`,
      type: 'success',
    });
  }
  /**
   * 添加接口数据源
   * @param pageVariable
   * @returns
   */
  function addApiDataSource(apiDataSource: ApiDataSource) {
    if (state[apiDataSource.name]) {
      ElMessage({
        showClose: true,
        message: `已存在 ${apiDataSource.name} 页面变量名或者数据源变量名`,
        type: 'error',
      });
      return false;
    }
    // 脱离表单的内容
    apiDataSource = cloneDeep(apiDataSource);
    apiDataSourceList.value.push(apiDataSource);
    ElMessage({
      showClose: true,
      message: `数据源 ${apiDataSource.name} 添加成功`,
      type: 'success',
    });
  }

  /**
   * 编辑页面变量
   * @param pageVariable
   */
  function editPageVariable(pageVariable: PageVariable) {
    const preDataSource = pageVariableList.value.find(
      (item) => item.name === pageVariable.name
    )!;
    merge(preDataSource, pageVariable);
    ElMessage({
      showClose: true,
      message: `数据源 ${pageVariable.name} 更新成功`,
      type: 'success',
    });
  }

  /**
   * 删除页面变量
   * @param param0
   */
  function deletePageVariable({ name }: PageVariable) {
    ElMessageBox.confirm(`确定删除数据源 ${name} 吗？`, `删除数据源 ${name}`, {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(() => {
      remove(pageVariableList.value, (item) => item.name === name);
      delete state.value[name];
      ElMessage({
        type: 'success',
        message: `数据源 ${name} 已被删除`,
      });
    });
  }

  /**
   * 复制数据源
   * @param dataSource
   */
  function copyDataSource(dataSource: PageVariable | ApiDataSource) {
    dataSource = cloneDeep(dataSource);
    dataSource.name = dataSource.name + 'Copy';
    if (dataSource.type === DataSourceType.PageVariable) {
      pageVariableList.value.push(dataSource);
    } else if (dataSource.type === DataSourceType.ApiDataSource) {
      apiDataSourceList.value.push(dataSource);
    }
    ElMessage({
      showClose: true,
      message: `数据源 ${dataSource.name} 添加成功`,
      type: 'success',
    });
  }

  return {
    defaultDataList,
    pageVariableList,
    apiDataSourceList,
    state,
    currentDataSourceTab,
    isOpenDataSourcePanel,
    addPageVariable,
    editPageVariable,
    addApiDataSource,
  };
});

// export const useDataSource = defineStore('dataSource', {
//   state: (): State => {
//     return {
//       // url 变量
//       urlParams: {
//         name: 'urlParams',
//         desc: 'URL 上 querystring 解析后的对象',
//         expression: `qs.parse(window.location.search);`,
//         type: DataSourceType.UrlParams,
//       },
//       pageVariable: [],
//       apiDataSource: [],
//       state: {},
//     };
//   },
//   actions: {

//     /**
//      * 添加页面变量
//      * @param pageVariable
//      * @returns
//      */
//     addPageVariable(pageVariable: PageVariable) {
//       if (this.pageVariable.find(item => item.name === pageVariable.name)) {
//         ElMessage({
//           showClose: true,
//           message: `数据源变量名 ${pageVariable.name} 已存在`,
//           type: 'error',
//         });
//         return false;
//       }
//       // 脱离表单的内容
//       pageVariable = cloneDeep(pageVariable);
//       this.pageVariable.push(pageVariable);
//       // 初始化表达式值
//       this.initPageVariableState(pageVariable);
//       ElMessage({
//         showClose: true,
//         message: `数据源 ${pageVariable.name} 添加成功`,
//         type: 'success',
//       });
//     },

//     /**
//      * 编辑页面变量
//      * @param pageVariable
//      */
//     editPageVariable(pageVariable: PageVariable) {
//       const preDataSource = this.pageVariable.find(item => item.name === pageVariable.name)!;
//       merge(preDataSource, pageVariable);
//       // 初始化表达式值
//       this.initPageVariableState(pageVariable);
//       ElMessage({
//         showClose: true,
//         message: `数据源 ${pageVariable.name} 更新成功`,
//         type: 'success',
//       });
//     },

//     /**
//      * 删除页面变量
//      * @param param0
//      */
//     deletePageVariable({ name }: PageVariable) {
//       ElMessageBox.confirm(
//         `确定删除数据源 ${name} 吗？`,
//         `删除数据源 ${name}`,
//         {
//           confirmButtonText: '确定',
//           cancelButtonText: '取消',
//           type: 'warning',
//         }
//       )
//         .then(() => {
//           remove(this.pageVariable, item => item.name === name);
//           delete this.state[name];
//           ElMessage({
//             type: 'success',
//             message: `数据源 ${name} 已被删除`,
//           })
//         });
//     },

//     /**
//      * 复制数据源
//      * @param dataSource
//      */
//     copyDataSource(dataSource: PageVariable | ApiDataSource) {
//       dataSource = cloneDeep(dataSource);
//       dataSource.name = dataSource.name + 'Copy';
//       if (dataSource.type === DataSourceType.PageVariable) {
//         this.pageVariable.push(dataSource);
//       } else if (dataSource.type === DataSourceType.ApiDataSource) {
//         this.apiDataSource.push(dataSource);
//       }
//       ElMessage({
//         showClose: true,
//         message: `数据源 ${dataSource.name} 添加成功`,
//         type: 'success',
//       });
//     },

//     initPageVariableState({ expression, name }: PageVariable) {
//       this.pageVariable
//       const context = {
//         state: this.state,
//         qs,
//         _,
//       };
//       const value = parseExpression(expression, context);
//       this.state[name] = value;

//     },
//     init() {
//       this.initPageVariableState();
//   },
// });
