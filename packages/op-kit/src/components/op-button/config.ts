import { getDefaultFormState } from '@lljj/vue3-form-element';
import { hiddenProperty, uniqueId } from '../../common/config';
import icon from './button.png';

const metaData = {
  // 组件名称
  name: '按钮',
  // 组件名
  componentName: 'op-button',
  // 是否容器组件
  isContainer: false,
  // 类型
  category: '',
  // 图标
  icon,
};

const dataSchema = {
  type: 'object',
  properties: {
    // 唯一属性
    uniqueId,
    /**
     * 是否显示
     */
    display: {
      type: 'string',
      title: '显示组件',
      default: 'true',
    },
    /**
     * 按钮文本
     */
    opText: {
      type: 'string',
      title: '文本',
      default: '提交',
    },

    type: {
      type: 'string',
      title: '按钮类型',
      default: 'primary',
      enum: [
        '',
        'primary',
        'success',
        'warning',
        'danger',
        'info',
      ],
      enumNames: [
        'default',
        'primary',
        'success',
        'warning',
        'danger',
        'info',
      ],
    },
  },
};

const data = getDefaultFormState(dataSchema, {}, dataSchema);

const styleSchema = {};

const style = getDefaultFormState(styleSchema, {}, styleSchema);

const eventSchema = {};

const event = getDefaultFormState(eventSchema, {}, eventSchema);

export { metaData, data, style, event, dataSchema, styleSchema, eventSchema };
