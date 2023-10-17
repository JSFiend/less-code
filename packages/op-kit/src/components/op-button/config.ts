import { getDefaultFormState } from '@lljj/vue3-form-element';
import { hiddenProperty } from '../../common/config';
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
}

const dataSchema = {
  title: 'A list of tasks',
  type: 'object',
  properties: {
    /**
     * 是否隐藏
     */
    hidden: {
      type: 'string',
      title: '隐藏组件',
      default: '',
    },
    /**
     * 按钮文本
     */
    text: {
      type: 'string',
      title: '文本',
      default: '提交'
    },
  },
};


const data = getDefaultFormState(dataSchema, {}, dataSchema);

const styleSchema = {};

const style = getDefaultFormState(styleSchema, {}, styleSchema);

const eventSchema = {};

const event = getDefaultFormState(eventSchema, {}, eventSchema);

export { metaData, data, style, event, dataSchema, styleSchema, eventSchema };
