export * from './state';

import { stateInit } from './state';

/**
 * 初始化数据钩子
 */
export function dataHookInit() {
  stateInit();
}