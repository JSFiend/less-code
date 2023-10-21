<template>
  <draggable
    :list="instanceList"
    item-key="component"
    group="component"
    class="renderContent"
    @end="dragend"
    @start="dragstart"
    @change="change"
  >
    <template #item="{ element, element: { data, metaData, style } }">
      <component
        :is="metaData.componentName"
        :id="data.uniqueId"
        v-bind="data"
        :style="style"
        @click="selectComponent(element, $event)"
      >
        <template v-for="(child, index) in data.children" v-slot:[`slot${index}`]>
          <render-component :instanceList="child.children"></render-component>
        </template>
      </component>
    </template>
  </draggable>
</template>

<script setup lang="ts">
import draggable from "vuedraggable";
import { transformStringWithRandomChars } from "@/utils";
import { useComponentInstanceStore } from "@/store/component-instance-store";
const componentInstanceStore = useComponentInstanceStore();

const { selectedInstance } = toRefs(componentInstanceStore);

const props = defineProps({
  instanceList: {
    type: Array,
    default: () => [],
  },
});

interface ChangeEventContent {
  newIndex: number;
  oldIndex?: number;
  // 当前数据
  element: any;
}
interface ChangeEvent {
  added?: ChangeEventContent;
  moved?: ChangeEventContent;
}
function change(changeEvent: ChangeEvent) {
  console.log("changeEvent", changeEvent);
  if (changeEvent.added) {
    const { element: component } = changeEvent.added;
    component.data.uniqueId = transformStringWithRandomChars(
      component.metaData.componentName
    );
    selectedInstance.value = component;
  }
}
function selectComponent(componentInstance: any, event: MouseEvent) {
  selectedInstance.value = componentInstance;
  event.stopPropagation();
  return false;
}
function dragstart(...arg: any) {
  console.log("start", arg);
  // }
}

function dragend(...arg: any) {
  console.log("dragend", arg);
}
</script>

<style lang="scss">
.renderContent {
  @apply min-h-full;
}
.renderContent:empty::after {
  content: "请放置组件";

  @apply w-full border border-primary border-dashed text-gray-500 h-10 block text-center leading-10;
}
</style>
