<template>
  <header class="flex justify-between text-ms py-1 px-2 h-10">
    <project-name></project-name>
    <div>
      <data-source></data-source>
    </div>
    <div>
      <environment></environment>
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
// import { useDark, useToggle } from "@vueuse/core";

// const isDark = useDark();
// const toggleDark = useToggle(isDark);

</script>
