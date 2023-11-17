

// 基础信息
export interface BaseData {
    // 组件名称
    name: string,
    // 组件名
    componentName: string,
    // 是否容器组件
    isContainer: boolean,
    // 类型
    category: string,
    // 图标
    icon: string,
}


export interface Schema {
  type: string,
  properties: {
    [key: string]: {
      type: string,
      title: string,
      [key: string]: any,
    }
  }
}

export interface ComponentConfig {

}

// 插槽子组件
export interface SlotChildren {
  children: ComponentInstance[]
}
export interface ComponentInstance {
  baseData: BaseData,
  data: {
    uniqueId: string,
    slotChildren?: SlotChildren[],
  },
  style: Record<string, any>,
  dataSchema: Schema, 
  styleSchema: Schema,
  eventSchema: Schema, 
  event: ComponentEvent,
}

export interface ComponentEvent {
  [key: string]: any,
}