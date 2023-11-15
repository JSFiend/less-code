import { getDefaultFormState } from '@lljj/vue3-form-element';
import { hiddenProperty, uniqueId } from '../../common/config';
import icon from './button.png';
import { BaseData, Schema, ComponentInstance } from '~types/op-kit/component';

const baseData: BaseData = {
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

const dataSchema: Schema = {
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

const styleSchema: Schema = {
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
    eventName: 'click',
    params: [
      {
        label: '事件参数',
        paramName: 'event',
      },
    ],
  },
  {
    label: '初始化完成',
    eventName: 'init',
    params: [
      {
        label: '组件实例',
        paramName: 'instance',
      },
      {
        label: '组件参数',
        paramName: 'props',
      },
    ],
  },
] as const;
// as const 锁定下面的 typeof 返回的是 click 和 init

type EventKeys = typeof eventSchema[number]['eventName'];

type EventObject = {
  [K in EventKeys]?: any;
};

const event: EventObject = {};



// 示例：
// const exampleObject: EventObject = {
//   click: 'clicked',
//   init: 'initialized'
// };



export { baseData, data, style, event, eventSchema, dataSchema, styleSchema };
