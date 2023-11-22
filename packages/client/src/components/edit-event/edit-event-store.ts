import type { Action } from '~types';

export const useEventStore = defineStore('editEventStore', () => {

  const eventPanelVisible = ref(false);
  const actionPanelVisible = ref(false);
  const activeAction = ref<Action>({});
  const currentActionList = ref<Action[]>([]);
  return {
    eventPanelVisible,
    actionPanelVisible,
    activeAction,
    currentActionList,
  };
});
