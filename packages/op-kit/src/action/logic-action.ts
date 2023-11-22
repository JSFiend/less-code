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
          title: '表达式',
          default: '1 + 1 = 2',
        },
      },
    },
    params: {
      
    },
    children: [],
    action(params: any, context: any, next: Function) {
      ElMessage(params);
      next();
    },
  },
];