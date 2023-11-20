import { useCommonContext } from '@/context';

type Context = { [key: string]: any };

/**
 * 解析函数字符串
 * @param funStr
 * @param context
 * @returns
 */
export function parseFunStr(
  funStr: string,
  context?: Context
): (...args: any[]) => any {
  const commonContext = useCommonContext();
  context = { ...commonContext, ...context };
  try {
    // 获取所有参数名
    const argNames = Object.keys(context);
    // 参数实参
    const argValues = Object.values(context);
    // 为了函数字符串看起来更美观，采取按需引入。 这里会去掉按需引入，最后是引入所有的上下文对象
    funStr = funStr.replace(/function\s*?\(.*?\)/, 'function()');
    // 加上表达式, new Function 实例化前面是参数，最后一个参数是表达式
    argNames.push(`return (${funStr})(...arguments)`);
    const func = new Function(...argNames);
    return (...args: any[]) => func(...argValues, ...args);
  } catch (error) {
    console.error(`Failed to create function: ${error}`);
    return () => null;
  }
}
/**
 * 解析表达式
 * @param expression
 * @param context
 * @param arg
 * @returns
 */
export function parseExpression(
  expression: string,
  context?: Context,
  ...arg: any[]
): any {
  const commonContext = useCommonContext();
  context = { ...commonContext, ...context };
  try {
    const argNames = Object.keys(context);
    let argValues = Object.values(context);
    expression = `return () => {
      try { return ${expression} } catch(err) {return ''}
    }`;
    argNames.push(expression);
    const fun = new Function(...argNames);
    const refFun = fun(...argValues, ...arg);
    // console.log('refFun', refFun);
    return computed({
      get: refFun,
      // computed 默认不可编辑， 使用set 允许设置值
      set() {},
    });
  } catch (error) {
    console.log('error', error);
    return {
      get() {
        return null;
      },
      // computed 默认不可编辑， 使用set 允许设置值
      set() {},
    };
  }
}

/**
 * 解析参数对象属性值，支持变量模版
 * @param obj
 * @param context
 * @returns
 */
export function objTemplateParser(
  obj: Record<string, any> | string,
  context: Context = {}
) {
  const commonContext = useCommonContext();
  context = { ...commonContext, ...context };
  console.log('obj22', JSON.stringify(obj));
  if (typeof obj === 'object') {
    for (let key in obj) {
      obj[key] = objTemplateParser(obj[key], context); // 递归处理嵌套的对象
    }
  } else if (typeof obj === 'string' && obj.includes('${')) {
    console.log('obj', obj);
    const template = obj.replace(/\${(.*?)}/g, (match, exp) => {
      console.log('parseExpression(exp, context).value;', parseExpression(exp, context).value);
      return parseExpression(exp, context).value;
    });
    return template;
  }
  return obj;
}

/**
 *
 * @param input 解析 js 字符串，返回 json 字符串
 * @returns
 */
export function isJsObject(input: string): [boolean, string | null] {
  try {
    // Use new Function for safer execution
    const func = new Function('return ' + input);
    const obj = func();

    if (obj && typeof obj === 'object' && !Array.isArray(obj)) {
      return [true, JSON.stringify(obj, null, 2)];
    }
    return [false, null];
  } catch (e) {
    return [false, null];
  }
}

/**
 * 检测一个字符串是否表示一个函数定义。
 *
 * @param str 要检查的字符串。
 * @returns 返回 `true` 如果字符串可能是一个函数定义，否则返回 `false`。
 *
 * 注意：这个函数主要使用正则表达式进行模式匹配，可能不会涵盖所有可能的函数格式或样式。
 */
export function isFunctionString(str: string) {
  const FUNCTION_PATTERN =
    /^(async\s+)?function[\s*]*\w*\s*\([\w\s,]*\)\s*{[\s\S]*}|^\([\w\s,]*\)\s*=>[\s\S]*|^\w+\s*=>[\s\S]*$/;
  return FUNCTION_PATTERN.test(str.trim());
}
