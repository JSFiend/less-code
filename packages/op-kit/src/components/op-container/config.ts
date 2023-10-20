import { getDefaultFormState } from '@lljj/vue3-form-element';
import { hiddenProperty, uniqueId } from '../../common/config';
import icon from './button.png';

const metaData = {
  // 组件名称
  name: '按钮',
  // 组件名
  componentName: 'op-container',
  // 是否容器组件
  isContainer: true,
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
  },
};

const data = getDefaultFormState(dataSchema, {}, dataSchema);

const styleSchema = {
  type: 'object',
  properties: {
    margin: {
      type: 'string',
      title: '外边距',
      default: '20px',
    },
    padding: {
      type: 'string',
      title: '内边距',
      default: '20px',
    },
  },
};

const style = getDefaultFormState(styleSchema, {}, styleSchema);

const eventSchema = {};

const event = getDefaultFormState(eventSchema, {}, eventSchema);

const children = [];

export {
  metaData,
  data,
  style,
  event,
  dataSchema,
  styleSchema,
  eventSchema,
  children,
};
