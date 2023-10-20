<template>
  <div class="simulator relative" id="simulator" @mousemove="handleHover">
    <render-component :instanceList="instanceList"></render-component>
    <select-wrapper />
  </div>
</template>

<script setup lang="ts">
import { useComponentInstanceStore } from "@/store/component-instance-store";
const componentInstanceStore = useComponentInstanceStore();

const { instanceList } = toRefs(componentInstanceStore);
</script>

<style scoped>
.simulator {
  padding: 20px;
}
</style>
