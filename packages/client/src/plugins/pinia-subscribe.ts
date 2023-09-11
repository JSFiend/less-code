import type { PiniaPluginContext } from 'pinia';
import localforage from 'localforage';

export async function piniaSubscribe({ store }: PiniaPluginContext) {
  /**
   * 数据持续化 - 保存
   */
  store.$subscribe((mutation, state) => {
    const rawData = state;
    if (mutation.storeId === 'dataSource') {
      const defaultDataList = toRaw(rawData.defaultDataList);
      const pageVariableList = toRaw(rawData.pageVariableList);
      const apiDataSourceList = toRaw(rawData.apiDataSourceList);
      console.log(
        'dataSource',
        defaultDataList,
        pageVariableList,
        apiDataSourceList
      );
      // toRaw 可以从 proxy 对象中拿到原始值
      localforage.setItem(mutation.storeId, {
        defaultDataList,
        pageVariableList,
        apiDataSourceList,
      });
    } else {
      localforage.setItem(mutation.storeId, rawData);
    }
  });

  // 数据持续话 - 读取
  const data = await localforage.getItem<Record<string, any>>(store.$id);
  data && store.$patch(data as any);

  // 初始化 store
  store.init && store.init();
}
