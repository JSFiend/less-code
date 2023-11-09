<template>
  <div class="preview relative" id="preview">
    <preview-render :instanceList="instanceList"></preview-render>
  </div>
</template>

<script setup lang="ts">
import previewRender from '@/preview/preview-render.vue';
import { useComponentInstanceStore } from "@/store/component-instance-store";
const componentInstanceStore = useComponentInstanceStore();

const { instanceList } = toRefs(componentInstanceStore);
</script>

<style scoped>
.preview {
  padding: 20px;
  @apply min-h-full;
}
</style>
