import { cloneDeep, merge, remove, has } from 'lodash-es';
import {
  DataSourceType,
  PageVariable,
} from '~types/data-source';
import { parseExpression } from '@/utils/parse';
import { ElMessageBox } from 'element-plus';
import 'element-plus/theme-chalk/src/message-box.scss';
import 'element-plus/theme-chalk/src/message.scss';
import { useDataSourceStore } from '@/components/data-source/data-source-store';
export const usePageVariableStore = defineStore('pageVariableStore', () => {

  const dataSourceStore = useDataSourceStore();

  // 页面变量
  const pageVariableList = ref<PageVariable[]>([]);

  // 所有数据
  const state = dataSourceStore.state;

  // 是否打开编辑编辑页面变量
  const editPageVariableVisible = ref(false);

  // 当前编辑的页面变量
  const currentEditPageVariable = ref<PageVariable>({
    name: '',
    desc: '',
    expression: ``,
    type: DataSourceType.PageVariable,
  });

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
    if (has(state, pageVariable.name)) {
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
  function copyPageVariable(originDataSource: PageVariable) {
    const dataSource = cloneDeep(originDataSource);
    dataSource.name = dataSource.name + 'Copy';
    if (has(state, dataSource.name)) {
      ElMessage({
        message: `数据源 ${dataSource.name} 已存在`,
      });
      return false;
    }
      // 找到目标项的下标
      const index = pageVariableList.value.findIndex(
        (item) => item.name === originDataSource.name
      );
      pageVariableList.value.splice(index + 1, 0, dataSource);
    ElMessage({
      showClose: true,
      message: `数据源 ${dataSource.name} 添加成功`,
      type: 'success',
    });
  }

  return {
    pageVariableList,
    currentEditPageVariable,
    editPageVariableVisible,
    addPageVariable,
    editPageVariable,
    deletePageVariable,
    copyPageVariable,
  };
});
