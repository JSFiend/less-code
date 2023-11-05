<template>
  <draggable :list="instanceList" v-bind="dragOption" v-on="dragEvent">
    <template #item="{ element, element: { data, metaData, style } }">
      <component
        :is="metaData.componentName"
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

const dragOption = {
  "item-key": "uniqueId",
  group: { name: "component", pull: true, put: true },
  class: "renderContent",
  ghostClass: "sortable-ghost",
  chosenClass: "sortable-chosen",
  dragClass: "sortable-drag",
  delay: 100,
  forceFallback: false,
};
const dragEvent = {
  end: dragend,
  start: dragstart,
  change: change,
  move: dragmove,
};

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
  console.log("event", event);
  selectedInstance.value = componentInstance;
  event.stopPropagation();
  return false;
}
function dragstart(...arg: any) {
  console.log("start", arg);
  // }
}

function dragmove(event: any) {
  console.log("dragmove", event);
  // 找到所有类名为 "sortable-ghost" 的元素
  const existingHasGhostElements = document.querySelectorAll(".hasGhost");
  existingHasGhostElements.forEach((element) => {
    element.classList.remove("hasGhost");
  });
  // 去容器加 hasGhost 样式
  if (event.to) {
    event.to.classList.add("hasGhost");
  }
}

function dragend(...arg: any) {
  console.log("dragend", arg);
  // 删除所有具有 "hasGhost" 类名的标签的 "hasGhost" 类名
  const existingHasGhostElements = document.querySelectorAll(".hasGhost");
  existingHasGhostElements.forEach((element) => {
    element.classList.remove("hasGhost");
  });
}
</script>

<style lang="scss">
@keyframes boxShadowChange {
  0% {
    box-shadow: inset 0 0 0 5px #a7f3d0;
  }
  50% {
    box-shadow: inset 0 0 0 5px #14b8a6;
  }
  100% {
    box-shadow: inset 0 0 0 5px #a7f3d0;
  }
}
.renderContent {
  @apply min-h-full;

  // 拖拽的时候， button 的transition 会影响到拖拽的transition速度
  .el-button {
    transition: none;
  }
  &.hasGhost {
    animation: boxShadowChange 1s infinite alternate;
  }

  &:empty::after {
    content: "请放置组件";

    @apply w-full border border-primary border-dashed text-gray-500 h-20 block text-center leading-10;
  }
}

.sortable-ghost {
  // background: red !important;
}
.sortable-chosen {
  // background: blue !important;
}
.sortable-drag {
  background: green !important;
}
// ghostClass: "sortable-ghost",  // drop placeholder的css类名
// chosenClass: "sortable-chosen",  // 被选中项的css 类名
//  dragClass: "sortable-drag",  // 正在被拖拽中的css类名
</style>
