import { cloneDeep, remove, has, merge } from 'lodash-es';
import { ApiDataSource } from '~types/data-source';
import { ElMessageBox } from 'element-plus';
import 'element-plus/theme-chalk/src/message-box.scss';
import 'element-plus/theme-chalk/src/message.scss';
import { useDataSourceStore } from '@/components/data-source/data-source-store';

export const useApiDataSourceStore = defineStore('apiDataSourceStore', () => {
  const dataSourceStore = useDataSourceStore();

  // 是否打开api数据源面板
  const isOpenApiDataSourcePanel = ref(false);

  // api 数据源
  const apiDataSourceList = ref<ApiDataSource[]>([]);

  // 所有数据
  const state = dataSourceStore.state;

  // 当前编辑的页面变量
  const currentEditApiDataSource = ref<null | ApiDataSource>(null);

  watch(isOpenApiDataSourcePanel, (is) => {
    if (is) {
    } else {
      // 关闭的时候把编辑对象清空
      currentEditApiDataSource.value = null;
    }
  });

  const isEdit = computed(() => !!currentEditApiDataSource.value);

  // 初始化api数据源变量的值
  watch(
    apiDataSourceList,
    (list) => {
      list.forEach(({ name, response }) => {
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
   * 添加接口数据源
   * @param pageVariable
   * @returns
   */
  function addApiDataSource(apiDataSource: ApiDataSource) {
    if (has(state, apiDataSource.name)) {
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
   * 删除 ApiDataSource 数据源
   * @param param
   */
  function deleteApiDataSource({ name }: ApiDataSource) {
    ElMessageBox.confirm(`确定删除数据源 ${name} 吗？`, `删除数据源 ${name}`, {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(() => {
      remove(apiDataSourceList.value, (item) => item.name === name);
      // 如果有这个属性， 删除他
      if (has(state, name)) delete state[name];
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
  function copyApiDataSource(originDataSource: ApiDataSource) {
    const dataSource = cloneDeep(originDataSource);
    dataSource.name = dataSource.name + 'Copy';
    if (has(state, dataSource.name)) {
      ElMessage({
        message: `数据源 ${dataSource.name} 已存在`,
      });
      return false;
    }
    // 找到目标项的下标
    const index = apiDataSourceList.value.findIndex(
      (item) => item.name === originDataSource.name
    );
    apiDataSourceList.value.splice(index + 1, 0, dataSource);
    ElMessage({
      showClose: true,
      message: `数据源 ${dataSource.name} 添加成功`,
      type: 'success',
    });
  }

   /**
   * 编辑api数据源
   * @param ApiDataSource
   */
   function editApiDataSource(apiDataSource: ApiDataSource) {
    const preDataSource = apiDataSourceList.value.find(
      (item) => item.name === apiDataSource.name
    )!;
    merge(preDataSource, apiDataSource);
    ElMessage({
      showClose: true,
      message: `数据源 ${apiDataSource.name} 更新成功`,
      type: 'success',
    });
  }

  return {
    apiDataSourceList,
    currentEditApiDataSource,
    isOpenApiDataSourcePanel,
    isEdit,
    addApiDataSource,
    deleteApiDataSource,
    copyApiDataSource,
    editApiDataSource,
  };
});
