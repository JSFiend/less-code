<template>
  <header class="flex justify-between text-ms py-1 px-2 h-10">
    <project-name></project-name>
    <div>
      <data-source></data-source>
      <environment></environment>
    </div>
    <div>
      <router-link to="/preview" target="_blank">
        <el-button type="primary" size="small">预览</el-button>
      </router-link>
      <el-button size="small" type="primary" class="ml-4" @click="toggleDark()">
        <el-icon><SoldOut></SoldOut></el-icon>
        导出
      </el-button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useDark, useToggle } from "@vueuse/core";

const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>
