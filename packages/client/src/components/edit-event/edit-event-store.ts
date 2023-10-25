

export const useEventStore = defineStore('editEventStore', () => {

  const eventPanelVisible = ref(false);
  const actionPanelVisible = ref(false);
  return {
    eventPanelVisible,
    actionPanelVisible,
  };
});
