import { ComponentInstance } from '~types/index';
import { objTemplateParser } from 'op-kit/utils';
import { cloneDeep } from 'lodash-es';

const eventCenter = ref<Record<string, any>>({});

import { opAction } from './index';

/**
 * 事件管理中心，组件list发生变化时，自动注册事件
 * @param instanceList 
 * @returns 
 */
export function useEventCenter(instanceList: Ref<ComponentInstance[]>): {
  eventCenter: Ref<Record<string, any>>;
} {
  watchEffect(() => registerEvents(instanceList));
  return {
    eventCenter,
  };
}

// 注册事件
export function registerEvents(instanceList: Ref<ComponentInstance[]>) {
  // 递归终止条件
  if (!instanceList.value?.length) return false;

  // 开始遍历
  for (let i = 0; i < instanceList.value.length; i++) {
    const instance = instanceList.value[i];
    const {
      data: { uniqueId, children },
      event,
    } = instance;
    if (event) {
      eventCenter.value[uniqueId] = event;
    }

    // 遍历children
    if (children?.length) {
      for (let j = 0; j < children.length; j++) {
        registerEvents(ref(children[j].children));
      }
    }
  }
}

// 触发事件

export function emitEvent(
  uniqueId: string,
  event: string,
  params?: Record<string, any>
) {
  if (!eventCenter.value[uniqueId] || !eventCenter.value[uniqueId][event]) {
    console.warn('找不到事件:', uniqueId, event);
    return false;
  }

  const stack = eventCenter.value[uniqueId][event];

  console.log('stack', stack);

  let runStack = [...stack];


  const eventContent = {
    uniqueId,
    event,
    params,
    runStack,
    index: 0,
    action: {},
  };

  function next() {
    if (eventContent.index < runStack.length) {
      const action = runStack[eventContent.index];

      if (!action) {
        console.warn('事件编排结束，上下文为：', eventContent);
        return false;
      }

      // next 会触发下一个action
      eventContent.index++;
      // 上下文当前执行的 action
      eventContent.action = action;

      let { actionName, params } = action;
      // 拿到参数
      params = objTemplateParser(cloneDeep(params), eventContent);
      // 拿到原来的action 的action 办法
      const originAction = opAction.find((item) => item.actionName === actionName);
      console.log('params', params);
      originAction?.action(params, eventContent, next);
    }
  }
  next();
}
