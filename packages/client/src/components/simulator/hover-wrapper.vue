<template>
  <div :style="wrapperStyle"></div>
</template>

<script setup lang="ts">
import { ref, toRefs } from "vue";

export interface SelectWrapperProps {
  top: number;
  left: number;
  width: number;
  height: number;
  borderColor: string;
}

const props = defineProps<SelectWrapperProps>();

const wrapperStyle = computed(() => ({
  position: "absolute",
  top: props.top + "px",
  left: props.left + "px",
  width: props.width + "px",
  height: props.height + "px",
  border: `1px solid red`,
  pointerEvents: "none", // 确保点击不会被阻止
}));
</script>
