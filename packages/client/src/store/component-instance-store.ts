import { ComponentInstance } from '~types';
import { useEventCenter } from 'op-kit';

/**
 * 组件实例数据与操作
 */
export const useComponentInstanceStore = defineStore(
  'componentInstanceStore',
  () => {
    // 组件渲染列表
    const instanceList = ref<ComponentInstance[]>([]);

    const {eventCenter } = useEventCenter(instanceList);

    const selectedInstance = ref<ComponentInstance | null>(null);

    /**
     *
     * @param instance 删除组件
     * @returns
     */
    function deleteInstance(instance: ComponentInstance | null) {
      if (!instance) return;
      const { componentInstanceList, index, componentInstance } =
        traverseComponentInstanceList(instance, instanceList.value);
      componentInstanceList.splice(index, 1);
      if (selectedInstance.value?.data.uniqueId === instance.data.uniqueId) {
        selectedInstance.value = null;
      }
    }
    /**
     * 遍历 componentInstanceList 数组，递归查找 componentInstance
     * @param componentInstance
     * @param componentInstanceList
     * @returns
     */
    function traverseComponentInstanceList(
      componentInstance: ComponentInstance,
      componentInstanceList: ComponentInstance[]
    ) {
      /遍历 componentInstanceList 数组，递归查找 componentInstance */;
      for (let i = 0; i < componentInstanceList.length; i++) {
        const item = componentInstanceList[i];
        if (item.data.uniqueId === componentInstance.data.uniqueId) {
          return {
            index: i,
            componentInstance: item,
            componentInstanceList,
          };
        }
        if (item.data.slotChildren && item.data.slotChildren.length > 0) {
          /* 递归查找 slotChildren 的 children， 找出 componentInstance */
          for (let j = 0; j < item.data.slotChildren.length; j++) {
            const slotItem = item.data.slotChildren[j];
            if (slotItem.children && slotItem.children.length > 0) {
              return traverseComponentInstanceList(
                componentInstance,
                slotItem.children
              );
            }
          }
        }
      }
      return {
        index: -1,
        componentInstance: null,
        componentInstanceList,
      };
    }

    return {
      selectedInstance,
      instanceList,
      deleteInstance,
      eventCenter,
    };
  }
);
