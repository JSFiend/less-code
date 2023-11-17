import { ComponentInstance } from "~types";

/**
 * 组件实例数据与操作
 */
export const useComponentInstanceStore = defineStore('componentInstanceStore', () => {

  // 组件渲染列表
  const instanceList = ref<ComponentInstance[]>([]);

  const selectedInstance = ref<ComponentInstance | null>(null);
  

  return {
    selectedInstance,
    instanceList
  };
});
