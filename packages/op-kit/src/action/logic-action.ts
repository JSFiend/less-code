// logic 行为
export const logicAction = [
  {
    label: '条件分支',
    // value 所有的 action 唯一
    actionName: 'conditionalBranch',
    type: 'logic',
    // hover 显示的提示
    title: '若表达式存在错误，该分支将不会执行',
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
    action(params: any, context: any, next: Function) {
      ElMessage(params);
      next();
    },
  },
];