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

export const useDataSourceStore = defineStore('dataSourceStore', () => {
  // 默认数据
  const defaultDataList = ref<DefaultData[]>([
    {
      name: 'urlParams',
      desc: 'URL 上 querystring 解析后的对象',
      expression: `route.query`,
      type: DataSourceType.DefaultData,
    },
    {
      name: 'cookies',
      desc: 'cookies 对象',
      expression: `cookies`,
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

  // 是否打开编辑编辑页面变量
  const editPageVariableVisible = ref(false);

  // 当前编辑的页面变量
  const currentEditPageVariable = ref<PageVariable>({
    name: '',
    desc: '',
    expression: ``,
    type: DataSourceType.PageVariable,
  });

  // 是否打开编辑编辑页面变量
  enum ApiDataSourceContentStatus {
    // 新增
    ADD,
    // 编辑
    EDIT,
    // 关闭
    NONE,
  }
  const editApiDataSourceVisible = ref(false);

  // 当前编辑的页面变量
  const currentEditApiDataSource = ref({}) as unknown as ApiDataSource;

  // 初始化默认数据值
  watch(
    defaultDataList,
    (list) => {
      list.forEach(({ expression, name }) => {
        const value = parseExpression(expression);
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

  // 初始化api数据源变量的值
  watch(
    apiDataSourceList,
    (list) => {
      list.forEach(({ name, response }) => {
        console.log('response', response);
        state[name] = computed(() => {
          try {
            return JSON.parse(response);
          } catch (error) {
            return {}; // 或返回其他默认值
          }
        });
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
      delete state[name];
      ElMessage({
        type: 'success',
        message: `数据源 ${name} 已被删除`,
      });
    });
  }

  /**
   * 删除 ApiDataSource 数据源
   * @param param0
   */
  function deleteApiDataSource({ name }: ApiDataSource) {
    ElMessageBox.confirm(`确定删除数据源 ${name} 吗？`, `删除数据源 ${name}`, {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(() => {
      remove(apiDataSourceList.value, (item) => item.name === name);
      delete state[name];
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
  function copyDataSource(originDataSource: PageVariable | ApiDataSource) {
    const dataSource = cloneDeep(originDataSource);
    dataSource.name = dataSource.name + 'Copy';
    if (state[dataSource.name]) {
      ElMessage({
        message: `数据源 ${dataSource.name} 已存在`,
      });
      return false;
    }
    if (dataSource.type === DataSourceType.PageVariable) {
      // 找到目标项的下标
      const index = pageVariableList.value.findIndex(
        (item) => item.name === originDataSource.name
      );
      pageVariableList.value.splice(index + 1, 0, dataSource);
    } else if (dataSource.type === DataSourceType.ApiDataSource) {
      // 找到目标项的下标
      const index = apiDataSourceList.value.findIndex(
        (item) => item.name === originDataSource.name
      );
      apiDataSourceList.value.splice(index + 1, 0, dataSource);
    }
    ElMessage({
      showClose: true,
      message: `数据源 ${dataSource.name} 添加成功`,
      type: 'success',
    });
  }

  return {
    defaultDataList,
    state,
    currentDataSourceTab,
    isOpenDataSourcePanel,
  };
});
