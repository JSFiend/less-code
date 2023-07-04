import type { Ref } from 'vue';
export type TabPanelName = string | number;


export interface TabsProp {
  label: string,
  icon?: string,
  uid?: number,
  name?: string,
}

export interface TabsRootContext {
  tabsProps: TabsProp[],
  currentName: Ref<TabPanelName>,
  registerPane: (pane: TabsProp) => void
  unregisterPane: (uid: number) => void
}
