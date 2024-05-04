<template>
  <component
    v-for="{ data, baseData, style } in instanceList"
    :is="baseData.componentName"
    v-bind="data"
    :style="style"
    :key="data.uniqueId"
    :mataDataName="baseData.name"
  >
    <template v-for="(child, index) in data.dchildren" v-slot:[`slot${index}`]>
      <preview-render :instanceList="child.children"></preview-render>
    </template>
  </component>
</template>

<script lang="ts">
export default {  previewRender: 'previewRender' }
</script>
<script setup lang="ts">
import { ComponentInstance } from '~types/index';
const props = defineProps<{
  instanceList: ComponentInstance[]
}>();
</script>

<style scoped></style>
