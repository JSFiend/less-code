import type { PiniaPluginContext } from "pinia";
import localforage from "localforage";
import { omit } from 'lodash-es';

export async function piniaSubscribe({ store }: PiniaPluginContext) {
  /**
   * 数据持续化 - 保存
   */
  store.$subscribe((mutation, state) => {
    const rawData = state;
    if (mutation.storeId === "dataSource") {
      // toRaw 可以从 proxy 对象中拿到原始值
      localforage.setItem(mutation.storeId, {
        defaultDataList: toRaw(rawData.defaultDataList),
        pageVariableList: toRaw(rawData.pageVariableList),
        apiDataSourceList: toRaw(rawData.apiDataSourceList),
      });
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
