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

const styleSchema = {
  type: 'object',
  properties: {
    margin: {
      type: 'string',
      title: '外边距',
      default: '0px',
    },
    padding: {
      type: 'string',
      title: '内边距',
    },
  },
};

const style = getDefaultFormState(styleSchema, {}, styleSchema);


const eventSchema = [
  {
    label: '点击',
    value: 'click',
    params: [
      {
        label: '事件参数',
        value: 'event',
      },
    ],
  },
  {
    label: '初始化完成',
    value: 'init',
    params: [
      {
        label: '组件实例',
        value: 'instance',
      },
      {
        label: '组件参数',
        value: 'props',
      },
    ],
  },
] as const;
// as const 锁定下面的 typeof 返回的是 click 和 init

type EventKeys = typeof eventSchema[number]['event'];

type EventObject = {
  [K in EventKeys]?: any;
};

const event: EventObject = {};



// 示例：
// const exampleObject: EventObject = {
//   click: 'clicked',
//   init: 'initialized'
// };



export { metaData, data, style, event, eventSchema, dataSchema, styleSchema };
