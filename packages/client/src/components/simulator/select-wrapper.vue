<template>
  <div class=" select-wrapper" :style="wrapperStyle"></div>
</template>

<script setup lang="ts">
import { ref, toRefs } from "vue";

export interface SelectWrapperProps {
  top: number;
  left: number;
  width: number;
  height: number;
}

const props = defineProps<SelectWrapperProps>();

const wrapperStyle = computed(() => ({
  position: "absolute",
  top: props.top + "px",
  left: props.left + "px",
  width: props.width + "px",
  height: props.height + "px",
  pointerEvents: "none", // 确保点击不会被阻止
}));
</script>
<style lang="scss" scoped>
.select-wrapper {
  border: 1px solid red;
}
</style>
