import { uiAction } from './ui-action';

import { getDefaultFormState } from '@lljj/vue3-form-element';

export interface Action {
  [key: string]: any;
}

export const opAction = [...uiAction];

// 初始化默认值
opAction.forEach((action) => {
  Object.assign(
    action.params,
    getDefaultFormState(action.params, {}, action.params)
  );
});
