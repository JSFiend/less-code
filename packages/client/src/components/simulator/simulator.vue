<template>
  <div class="bg-white min-h-full relative flex" id="simulator" :style="style">
    <el-config-provider namespace="el">
      <render-component :instanceList="instanceList"></render-component>
      <select-wrapper />
    </el-config-provider>
  </div>
</template>

<script setup lang="ts">
import { useComponentInstanceStore } from "@/store/component-instance-store";
import { usePageConfigStore } from '@/components/page-config/page-config-store';
const componentInstanceStore = useComponentInstanceStore();
const { instanceList } = toRefs(componentInstanceStore);

const { pageConfig } = toRefs(usePageConfigStore());


const style = ref({});

watch(pageConfig, () => {
  style.value = {
    padding: pageConfig.value.padding + 'px',
    margin: pageConfig.value.margin + 'px',
  }
}, { immediate: true })
</script>

<style lang="scss">
#simulator {
  & > .renderContent {
    @apply flex-1;
  }
}
</style>
