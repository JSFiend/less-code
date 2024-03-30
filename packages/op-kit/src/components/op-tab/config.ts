import { getDefaultFormState } from '@lljj/vue3-form-element';
import { hiddenProperty, uniqueId } from '../../common/config';
import icon from './button.png';

const baseData = {
  // 组件名称
  name: '选项卡',
  // 组件名
  componentName: 'op-tab',
  // 是否容器组件
  isContainer: true,
  // 类型
  category: '',
  // 图标
  icon,
};

const dataSchema = {
  definitions: {
    Thing: {
      type: 'object',
      properties: {
        name: {
          title: 'Thing',
          type: 'string',
          default: 'Default name',
        },
      },
    },
  },
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
    active: {
      type: 'number',
      title: '当前激活的选项',
      default: 0,
    },
    slotChildren: {
      type: 'array',
      title: '选项',
      'ui:options': {
        showIndexNumber: true,
      },
      minItems: 2,
      items: {
        "$ref": "#/definitions/Thing"
      }
    },
  },
};

const data = getDefaultFormState(dataSchema, {}, dataSchema);

console.log('data', data, dataSchema);

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

export { baseData, data, style, event, dataSchema, styleSchema, eventSchema };
