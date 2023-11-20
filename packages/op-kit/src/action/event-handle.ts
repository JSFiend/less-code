import { ComponentInstance } from '~types/index';
import { objTemplateParser } from 'op-kit/utils';
import { cloneDeep } from 'lodash-es';

const eventCenter = ref<Record<string, any>>({});

import { opAction } from './index';

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
  console.log('instanceList', instanceList, instanceList.value.length);
  // 递归终止条件
  if (!instanceList.value.length) return false;

  // 开始遍历
  for (let i = 0; i < instanceList.value.length; i++) {
    const instance = instanceList.value[i];
    const {
      data: { uniqueId, slotChildren },
      event,
    } = instance;
    if (event) {
      eventCenter.value[uniqueId] = event;
    }

    // 遍历slotChildren
    if (slotChildren?.length) {
      for (let j = 0; j < slotChildren.length; j++) {
        registerEvents(ref(slotChildren[j].children));
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

  const eventContent = {
    uniqueId,
    event,
    params,
  };
  const runStack = [...stack];

  let index = 0;

  function next() {
    if (index < runStack.length) {
      let { actionName, params } = runStack[index];
      if (actionName) {
        index++;
        const action = opAction.find((item) => item.actionName === actionName);
        params = objTemplateParser(cloneDeep(params), eventContent);
        console.log('params', params);
        action?.action(params, eventContent, next);
      }
    }
  }
  next();
}
