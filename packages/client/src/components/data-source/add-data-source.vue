<template>
  <el-dropdown>
    <el-button size="small" type="primary">
      添加数据源<el-icon class="el-icon--right"><arrow-down /></el-icon>
    </el-button>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item><add-page-variable></add-page-variable></el-dropdown-item>
        <el-dropdown-item>
          <el-link
            :underline="false"
            size="small"
            @click="apiDataSourceStore.isOpenApiDataSourcePanel = true"
            >添加接口数据源</el-link
          ></el-dropdown-item
        >
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { useApiDataSourceStore } from "@/components/api-data-source/api-data-source-store";

const apiDataSourceStore = useApiDataSourceStore();
</script>

<style scoped></style>
