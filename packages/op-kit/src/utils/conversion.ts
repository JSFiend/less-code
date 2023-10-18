export function convertSchemaToProps(dataSchema: any) {
  const props: Record<string, any> = {};

  if (dataSchema.properties) {
    for (const [key, value] of Object.entries(dataSchema.properties)) {
      props[key] = {
        type: value.type === 'string' ? String : undefined, // 更多的类型检查可以在这里添加
        default: value.default,
      };
    }
  }

  return props;
}
