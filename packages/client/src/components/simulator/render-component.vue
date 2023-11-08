<template>
  <draggable :list="instanceList" v-bind="dragOption" v-on="dragEvent">
    <template
      #item="{ element, element: { data, metaData, style } }"
      :key="data.uniqueId"
    >
      <component
        :is="metaData.componentName"
        v-bind="data"
        :style="style"
        @click="selectComponent(element, $event)"
        @mouseover.stop.prevent="mouseover"
        @mouseout="mouseout"
        :class="{ selected: element === selectedInstance }"
        :key="data.uniqueId"
        :mataDataName="metaData.name"
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
  // delay: 100,
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

// 添加和移动都作为当前选中的组件
function change(changeEvent: ChangeEvent) {
  console.log("changeEvent", changeEvent);
  if (changeEvent.added) {
    const { element: component } = changeEvent.added;
    component.data.uniqueId = transformStringWithRandomChars(
      component.metaData.componentName
    );
    selectedInstance.value = component;
  } else if (changeEvent.moved) {
    const { element: component } = changeEvent.moved;
    component.data.uniqueId = transformStringWithRandomChars(
      component.metaData.componentName
    );
    selectedInstance.value = component;
  }
}
// 点击当前组件作为选中的组件
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

function mouseover(event: MouseEvent) {
  const existing = document.querySelectorAll("#simulator .hover");
  existing.forEach((element) => {
    element.classList.remove("hover");
  });
  event.currentTarget?.classList?.add("hover");
}
function mouseout(event: MouseEvent) {
  event.currentTarget?.classList?.remove("hover");
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

function dragend(event: any) {
  console.log("dragend", event);
  console.log("clone", event.clone);
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
  .hover {
    @apply relative;
    &::before {
      content: "";
      top: -1px;
      left: -1px;
      // hover 和 click 支持穿透
      pointer-events: none;
      @apply w-full h-full border border-primary border-dashed block absolute pointer-events-none box-content;
    }
    &::after {
      content: attr(mataDataName);
      @apply absolute text-white h-6 bg-primary leading-6 px-2 font-normal text-base;
      height: 1.5rem;
      top: -1.5rem;
      right: -1px;
    }
  }
}

.sortable-ghost {
  // @apply bg-primary border-2 border border-primary;
  // height: 2px !important;
  // overflow: hidden;
}
.sortable-chosen {
  // background: blue !important;
}
.sortable-drag {
  // background: green !important;
}
// ghostClass: "sortable-ghost",  // drop placeholder的css类名
// chosenClass: "sortable-chosen",  // 被选中项的css 类名
//  dragClass: "sortable-drag",  // 正在被拖拽中的css类名
</style>
