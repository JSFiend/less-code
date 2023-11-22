

export const useEventStore = defineStore('editEventStore', () => {

  const eventPanelVisible = ref(false);
  const actionPanelVisible = ref(false);
  const activeAction = ref<Action>(null);
  return {
    eventPanelVisible,
    actionPanelVisible,
    activeAction,
  };
});
