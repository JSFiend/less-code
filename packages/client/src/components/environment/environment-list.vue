<template>
  <el-table
    border
    :data="environment">
    <el-table-column
      prop="env"
      label="环境ID">
    </el-table-column>
    <el-table-column
      prop="name"
      label="环境名称">
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import { useEnvironmentStore } from "@/components/environment/store.ts";
const environmentStore = useEnvironmentStore();
const { environment } = storeToRefs(environmentStore);
</script>

<style scoped>

</style>