

/**
 * 组件实例数据与操作
 */
export const useComponentInstanceStore = defineStore('componentInstanceStore', () => {

  // 组件渲染列表
  const instanceList = ref([]);

  const selectedInstance = ref(null);
  

  return {
    selectedInstance,
    instanceList
  };
});
