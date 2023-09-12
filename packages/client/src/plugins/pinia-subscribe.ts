import type { PiniaPluginContext } from 'pinia';
import localforage from 'localforage';
import { refWithControl } from '@vueuse/core';

export async function piniaSubscribe({ store }: PiniaPluginContext) {
  /**
   * 数据持续化 - 保存
   */
  store.$subscribe((mutation, state) => {
    const rawData: Record<string, any> = {};
    Object.keys(state).forEach((key) => (rawData[key] = toRaw(state[key])));
    if (mutation.storeId === 'dataSource') {
      delete rawData.state;
    }
    localforage.setItem(mutation.storeId, rawData);
  });

  // 数据持续话 - 读取
  const data = await localforage.getItem<Record<string, any>>(store.$id);
  data && store.$patch(data as any);

  // 初始化 store
  store.init && store.init();
}
