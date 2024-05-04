import { getDefaultFormState } from '@lljj/vue3-form-element';
import { hiddenProperty, uniqueId, box } from '../../common/config';
import icon from './button.png';
import { ComponentInstance } from '~types/index';

const baseData = {
  // 组件名称
  name: '框容器',
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

const children: ComponentInstance[] = [];

const styleSchema = {
  type: 'object',
  properties: {
    box,
  },
};

const style = getDefaultFormState(styleSchema, {}, styleSchema);

const eventSchema = [
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
];

export { baseData, data, style, eventSchema, dataSchema, styleSchema, children };
