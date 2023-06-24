import type { PiniaPluginContext } from "pinia";
import localforage from 'localforage';



export async function piniaSubscribe({ store }: PiniaPluginContext) {

  /**
   * 数据持续化 - 保存
   */
  store.$subscribe((mutation, state) => {
    localforage.setItem(mutation.storeId, toRaw(state));
   });
  
  // 数据持续话 - 读取
  const data = await localforage.getItem<Record<string, any>>(store.$id);
  Object.assign(store.$state, data);

  // 初始化 store
  if (store.init) {
    store.init();
  }
}