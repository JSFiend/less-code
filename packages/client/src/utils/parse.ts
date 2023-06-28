
type Context = {[key: string]: any};

/**
 * 解析函数字符串
 * @param funStr 
 * @param context 
 * @returns 
 */
export function parseFunStr(funStr: string, context: Context): (...args: any[]) => any {
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
export function parseExpression(expression: string, context: Context, ...arg: any[]): any {
  try {
    const argNames = Object.keys(context);
    const argValues = Object.values(context);
    expression = `return () => ${expression}`;
    argNames.push(expression);
    const fun = new Function(...argNames);
    const refFun = fun(...argValues, ...arg);
    return computed({
      get: refFun,
      // computed 默认不可编辑， 使用set 允许设置值
      set() {},
    });
  } catch (error) {
    return null;
  }
  
}