type NestedObject = { [key: string]: any };

export function toDefinePropsFormat(obj: NestedObject): NestedObject {
  const result: NestedObject = {};

  for (const key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      if (Array.isArray(obj[key])) {
        // 如果数组中的第一个元素是对象，则假设整个数组都是对象数组
        if (obj[key].length > 0 && typeof obj[key][0] === 'object') {
          result[key] = {
            type: Array,
            default: () =>
              obj[key].map((item: any) => toDefinePropsFormat(item)),
          };
        } else {
          result[key] = {
            type: Array,
            default: () => obj[key],
          };
        }
      } else {
        result[key] = {
          type: Object,
          default: () => toDefinePropsFormat(obj[key]),
        };
      }
    } else {
      switch (typeof obj[key]) {
        case 'string':
          result[key] = {
            type: String,
            default: obj[key],
          };
          break;
        case 'number':
          result[key] = {
            type: Number,
            default: obj[key],
          };
          break;
        case 'boolean':
          result[key] = {
            type: Boolean,
            default: obj[key],
          };
          break;
        // 可以根据需要添加其他类型的处理
        default:
          throw new Error(`Unsupported type for key: ${key}`);
      }
    }
  }

  return result;
}
