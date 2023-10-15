import { getDefaultFormState } from '@lljj/vue3-form-element';
import { commonData } from '@/library/common/config';

const dataSchema = {
  title: 'A list of tasks',
  type: 'object',
  required: ['title'],
  properties: {
    ...commonData,
    text: {
      type: 'string',
      title: '文本',
      default: '按钮'
    },
  },
};

const data = getDefaultFormState(dataSchema, {}, dataSchema);

const styleSchema = {};

const style = getDefaultFormState(styleSchema, {}, styleSchema);

const eventSchema = {};

const event = getDefaultFormState(eventSchema, {}, eventSchema);

export { data, style, event, dataSchema, styleSchema, eventSchema };
