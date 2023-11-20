<template>
  <div class="preview relative" id="preview">
    <preview-render :instanceList="instanceList"></preview-render>
    {{ eventCenter }}
    lenL {{ len }}
  </div>
</template>

<script setup lang="ts">
import previewRender from '@/preview/preview-render.vue';
import { useComponentInstanceStore } from "@/store/component-instance-store";

import { useEventCenter, registerEvents } from 'op-kit';

const componentInstanceStore = useComponentInstanceStore();


const { instanceList } = toRefs(componentInstanceStore);

const { eventCenter, len } = useEventCenter(instanceList);


</script>

<style scoped>
.preview {
  padding: 20px;
  @apply min-h-full;
}
</style>
