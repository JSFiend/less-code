import type { PiniaPluginContext } from "pinia";
import localforage from 'localforage';



export function piniaSubscribe({ store }: PiniaPluginContext) {

  /**
   * 数据持续化 - 保存
   */
  store.$subscribe((mutation, state) => {
    localforage.setItem(mutation.storeId, toRaw(state));
   });
  
  // 数据持续话 - 读取
  localforage.getItem<Record<string, any>>(store.$id).then((data) => {
    Object.assign(store.$state, data)
  });
}