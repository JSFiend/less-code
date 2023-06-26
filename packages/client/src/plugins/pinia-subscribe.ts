import type { PiniaPluginContext } from "pinia";
import localforage from "localforage";

export async function piniaSubscribe({ store }: PiniaPluginContext) {
  /**
   * 数据持续化 - 保存
   */
  store.$subscribe((mutation, state) => {
    const rawData = toRaw(state);

    if (mutation.storeId === "dataSource") {
      // toRaw 只能浅层式去掉响应式， dataSource.state 是 computed 实例， 转化不了原数据进行存储
      localforage.setItem(mutation.storeId, { list: rawData.list});
    } else {
      localforage.setItem(mutation.storeId, rawData);
    }
  });

  // 数据持续话 - 读取
  const data = await localforage.getItem<Record<string, any>>(store.$id);
  Object.assign(store.$state, data);

  // 初始化 store
  if (store.init) {
    store.init();
  }
}
