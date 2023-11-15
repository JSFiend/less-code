<template>
  <draggable
    v-model="props.componentsInfo"
    itemKey="component"
    class="flex flex-wrap"
    :group="{ name: 'component', pull: 'clone', put: false }"
    :clone="cloneComponent"
    :sort="false"
  >
    <template #item="{ element: { baseData } }">
      <div class="component-item" :key="baseData.name">
        <el-icon :size="20" v-if="baseData.icon">
          <img :src="baseData.icon" />
        </el-icon>
        <p>{{ baseData.name }}</p>
      </div>
    </template>
  </draggable>
</template>

<script lang="ts" setup>
import draggable from "vuedraggable";
// import { findComponentConfigByComponentName, getKey } from 'src/components/Component/composable';
// import { ComponentConfig, ComponentType } from 'types';
// import { simulatorInstance } from '../Simulator/simulatorInstance';
import { cloneDeep } from "lodash-es";
import { ComponentInstance } from "~types/index";

const props = defineProps<{
  componentsInfo: ComponentInstance[];
}>();

function cloneComponent(component: any) {
  console.log(component);
  component = cloneDeep(component);
  return component;
  // 唯一id
  // component.data.uniqueId = transformStringWithRandomChars(component.baseData.componentName);
  // componentInstanceStore.selectedInstance = component;
  // return component;
  // 查找被放置的组件配置
  // const componentConfig = findComponentConfigByComponentName(componentName)!;
  // // 模拟器注册新增的组件
  // this.registerComponent(componentConfig);
  // // 创建组件的副本，避免同个组件的数据串连， 返回模拟器渲染的组件列表给拖拽过去模拟器渲染组件
  // const newComponent = Object.assign(cloneDeep(componentConfig), { key: getKey() });
  // // 如果是容器组件， 添加 children 属性
  // if (newComponent.info.componentType === ComponentType.Container) {
  //   Object.assign(newComponent, { children: [] });
  // }
  // return newComponent;
}

// 模拟器注册新增的组件
// function registerComponent(componentConfig: any) {
// const { component, info: { componentName } } = componentConfig;
// if (!simulatorInstance.component(componentName)) {
//   // toRaw 去掉 component 的响应性
//   simulatorInstance.component(componentName, toRaw(component));
// }
// }
</script>
<style scoped>
.component-list {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.component-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 80px;
  height: 80px;
  border: 1px solid #eee;
  padding: 10px;
  margin: 10px;
  justify-content: center;
  text-align: center;
}
</style>
