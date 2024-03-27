<template>
  <div class="bg-white min-h-full" id="simulator">
    <el-config-provider namespace="el">
      <render-component :instanceList="instanceList"></render-component>
      <select-wrapper />
    </el-config-provider>
  </div>
</template>

<script setup lang="ts">
import { useComponentInstanceStore } from "@/store/component-instance-store";
const componentInstanceStore = useComponentInstanceStore();
const { instanceList } = toRefs(componentInstanceStore);
</script>

<style lang="scss"></style>
