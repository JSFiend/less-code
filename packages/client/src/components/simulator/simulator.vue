<template>
  <div class="simulator relative" id="simulator">
    <render-component :instanceList="instanceList"></render-component>
    <select-wrapper />
  </div>
</template>

<script setup lang="ts">
import { useComponentInstanceStore } from "@/store/component-instance-store";
const componentInstanceStore = useComponentInstanceStore();

const { instanceList } = toRefs(componentInstanceStore);
</script>

<style lang="scss">
  .simulator {
    padding: 20px;
    @apply min-h-full h-full;
    > .renderContent {
      @apply min-h-full h-full;
      &:empty::after {
        @apply min-h-full h-full;
      }
    }
  }
</style>
