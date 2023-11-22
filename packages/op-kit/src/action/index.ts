import { uiAction } from './ui-action';

import { logicAction } from './logic-action';

import { getDefaultFormState } from '@lljj/vue3-form-element';

export * from './event-handle';

export const opAction = [...uiAction, ...logicAction];

// 初始化默认值
opAction.forEach((action) => {
  Object.assign(
    action.params,
    getDefaultFormState(action.params, {}, action.params)
  );
});
