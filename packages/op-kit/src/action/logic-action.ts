import { parseExpression } from 'op-kit/utils';

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
        conditional: {
          type: 'string',
          title: '表达式',
          default: '1 + 1 === 2',
        },
      },
    },
    params: {},
    children: [],
    action(params: any, context: any, next: Function) {
      const { runStack, index, action } = context;
      // 如果表达式是 true，则把该分支加入到 runStack 中，然后正常走事件编排的逻辑 next()
      if (parseExpression(params.conditional).value && action.children.length) {
        runStack.splice(index, 0, ...action.children);
      }
      next();
    },
  },
  {
    label: '组件联动',
    // value 所有的 action 唯一
    actionName: 'ComponentLinkage',
    type: 'logic',
    // hover 显示的提示
    title: '调用指定组件的办法',
    paramsSchema: {
      type: 'object',
      properties: {
        componentInstance: {
          type:'string',
          title: '组件实例',
          default: '1 + 1 === 2',
        },
      },
    },
    params: {},
    children: [],
    action(params: any, context: any, next: Function) {
      const { runStack, index, action } = context;
      // 如果表达式是 true，则把该分支加入到 runStack 中，然后正常走事件编排的逻辑 next()
      if (parseExpression(params.conditional).value && action.children.length) {
        runStack.splice(index, 0, ...action.children);
      }
      next();
    },
  },
];
