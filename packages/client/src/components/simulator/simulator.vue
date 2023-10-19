<template>
  <div
    class="simulator relative"
    id="simulator"
    @click="selectComponent"
    @mousemove="handleHover"
  >
    <draggable
      :list="instanceList"
      item-key="component"
      group="component"
      class="simulatorContent"
      @end="dragend"
      @start="dragstart"
    >
      <template #item="{ element }">
        <component v-bind="element.data" :is="element.metaData.componentName"></component>
      </template>
    </draggable>
    <select-wrapper v-if="selectedInstance" v-bind="selectWrapperProps" />
    <!-- <componentHandler :component-config="element">
          <component :is="element.info.componentName">
            <template v-if="element.info.componentType === ComponentType.Container">
              <simulatorContent :child-render-component="element.children" />
            </template>
          </component>
        </componentHandler> -->
  </div>
</template>

<script setup lang="ts">
import draggable from "vuedraggable";
import { useComponentInstanceStore } from "@/store/component-instance-store";
import { SelectWrapperProps } from "./select-wrapper.vue";
const componentInstanceStore = useComponentInstanceStore();

const { instanceList, selectedInstance } = toRefs(componentInstanceStore);

const selectTarget = {};

const selectWrapperProps = ref<SelectWrapperProps>({
  top: 0,
  left: 0,
  width: 0,
  height: 0,
});
function selectComponent(event: MouseEvent) {
  const targetElement = event.target as HTMLElement;

  // 获取目标元素的位置和大小信息
  const targetRect = targetElement.getBoundingClientRect();

  // 获取指定的父级元素的位置和大小信息
  // 假设你想要相对于 ID 为 'specificParent' 的元素
  const parentElement = document.getElementById("simulator");
  if (!parentElement) return; // 如果没有找到父级元素，直接返回
  const parentRect = parentElement.getBoundingClientRect();

  // 计算相对于父级元素的 top 和 left
  const top = targetRect.top - parentRect.top;
  const left = targetRect.left - parentRect.left;

  // 从 targetRect 中直接获取 width 和 height
  const width = targetRect.width;
  const height = targetRect.height;

  selectWrapperProps.value = {
    left,
    top,
    width,
    height,
  };
}

function dragstart(...arg: any) {
  console.log("start", arg);
  // const node = window.iframeWindow.document.getElementById('paging-container');
  // if (node) {
  //   let classVal = node.getAttribute('class');
  //   classVal = classVal.concat(' dragMove');
  //   node.setAttribute('class', classVal);
  // }
}

function dragend(...arg: any) {
  console.log("dragend", arg);
  // const node = window.iframeWindow.document.getElementById("paging-container");
  // if (node) {
  //   let classVal = node.getAttribute("class");
  //   classVal = classVal.replace("dragMove", "");
  //   node.setAttribute("class", classVal);
  // }
  // 拖拽事后事件，选中当前组件
  // this.dropComponentInstance(this.beCloneComponent);
}
</script>

<style scoped>
.simulator {
  padding: 20px;
}
</style>
