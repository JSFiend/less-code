/**
 * 组件实例数据与操作
 */
export const useEventStore = defineStore('eventStore', () => {
  // 事件列表
  const eventList = ref([]);

  return {
    eventList,
  };
});
