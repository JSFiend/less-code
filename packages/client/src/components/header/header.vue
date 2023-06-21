<template>
  <header class="flex justify-between text-ms py-1 px-2 h-10">
    <project-name></project-name>
    <div>
      <dataSourceVue></dataSourceVue>
    </div>
    <div>
      <el-button
        size="small"
        type="primary"
      >
        <el-icon><SoldOut></SoldOut></el-icon>
        导出
      </el-button>
      <el-button
        size="small"
        type="primary"
        @click="toggleDark()"
      >
        <el-icon><SoldOut></SoldOut></el-icon>
        导出
      </el-button>
    </div>        
  </header>
</template>
  
<script setup lang='ts'>
import projectName from './project-name.vue';
import dataSourceVue from '@/components/dataSource/dataSource.vue';
// import { useDark, useToggle } from "@vueuse/core";

// const isDark = useDark();
// const toggleDark = useToggle(isDark);

</script>
