<template>
  <template v-if="selectedInstance">
    <div class="relative select-wrapper" :style="wrapperStyle">
      <div class="select-wrapper-operator">
        <div class="select-wrapper-title">{{ selectedInstance.metaData.name }}</div>
      </div>
    </div>
  </template>
</template>

<script setup lang="ts">
import { useComponentInstanceStore } from "@/store/component-instance-store";
const componentInstanceStore = useComponentInstanceStore();
const { instanceList, selectedInstance } = toRefs(componentInstanceStore);

let wrapperStyle = ref({
  position: "absolute",
  top: "0px",
  left: "0px",
  width: "0px",
  height: "0px",
  pointerEvents: "none", // 确保点击不会被阻止
});

watchEffect(() => {
  if (selectedInstance.value) {
    nextTick(() => {
      const targetElement = document.querySelector("#simulator .selected");

      if (!targetElement) return;

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

      wrapperStyle.value = {
        position: "absolute",
        top: top + "px",
        left: left + "px",
        width: width + "px",
        height: height + "px",
        pointerEvents: "none", // 确保点击不会被阻止
      };
    });
  }
});
</script>
<style lang="scss" scoped>
.select-wrapper {
  @apply border border-primary;
  box-shadow: 0px 0px 6px -1px #5eead4;
  .select-wrapper-operator {
    @apply flex justify-end text-white h-6 relative;
    height: 1.5rem;
    top: -1.5rem;
    right: -1px;
    .select-wrapper-title {
      @apply bg-primary inline-block leading-6 px-2;
    }
  }
}
</style>
