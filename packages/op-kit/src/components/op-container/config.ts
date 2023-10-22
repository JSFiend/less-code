import { getDefaultFormState } from '@lljj/vue3-form-element';
import { hiddenProperty, uniqueId } from '../../common/config';
import icon from './button.png';

const metaData = {
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

// 框容器只有一个插槽,并且插槽无属性
data.children = [{ children: [] }];

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
      default: '0px',
    },
  },
};

const style = getDefaultFormState(styleSchema, {}, styleSchema);

const event = [
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
];

export { metaData, data, style, event, dataSchema, styleSchema };
