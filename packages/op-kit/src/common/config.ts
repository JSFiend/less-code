// 属性：是否隐藏
export const hiddenProperty = {
  hidden: {
    type: 'boolean',
    title: '隐藏组件',
    default: false,
  },
};

export enum Category {
  Container = 'Contarner',
}
export function getCategory(category: Category) {
  return {
    category: {
      type: 'string',
      title: '隐藏组件',
      default: category,
    },
  };
}
