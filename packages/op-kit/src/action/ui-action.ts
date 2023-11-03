import { ElMessage } from 'element-plus';

// ui 行为
export const uiAction = [
  {
    label: '弹出消息窗口',
    // value 所有的 action 唯一
    actionName: 'message',
    type: 'UI',
    // hover 显示的提示
    title: '居中显示一条消息提醒',
    paramsSchema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          title: '文案',
          default: '请填写文案',
          'ui:options': {
            placeholder: '请输入你的签名',
            type: 'textarea',
            rows: 6,
          },
        },
        type: {
          type: 'string',
          title: '类型',
          defalut: 'success',
          enum: ['success', 'warning', 'info', 'error'],
          enumNames: ['成功', '警告', '普通', '错误'],
        },
        showClose: {
          type: 'boolean',
          title: '是否显示关闭按钮',
          default: true,
        },
      },
    },
    params: {
      grouping: true,
    },
    action(params: any) {
      ElMessage(params);
    },
  },
];
