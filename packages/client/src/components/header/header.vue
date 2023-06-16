<template>
  <header class="flex justify-between text-ms py-1 px-2 h-10">
    <project-name></project-name>
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
      <button
        class="border-none w-full bg-transparent cursor-pointer"
        style="height: var(--ep-menu-item-height)"
        @click="toggleDark()"

      >asf
        <i inline-flex i="dark:ep-moon ep-sunny" />a
      </button>
    </div>        
  </header>
</template>
  
<script setup lang='ts'>
import projectName from './project-name.vue';
import { useDark, useToggle } from "@vueuse/core";

const isDark = useDark();
const toggleDark = useToggle(isDark);

</script>
