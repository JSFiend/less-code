<template>
  <component
    v-for="{ data, baseData, style } in instanceList"
    :is="baseData.componentName"
    v-bind="data"
    :style="style"
    :key="data.uniqueId"
    :mataDataName="baseData.name"
  >
    <template v-for="(child, index) in data.children" v-slot:[`slot${index}`]>
      <preview-render :instanceList="child.children"></preview-render>
    </template>
  </component>
</template>

<script setup lang="ts">
const props = defineProps({
  instanceList: {
    type: Array,
    default: () => [],
  },
});
</script>

<style scoped></style>
