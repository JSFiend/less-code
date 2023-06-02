<template>
  <header class="flex justify-between text-ms py-1 px-2 h-10">
    <div></div>
    <project-name></project-name>
    <div>
      <el-button
        size="small"
        type="primary"
      >
        <el-icon><SoldOut></SoldOut></el-icon>
        导出
      </el-button>
    </div>
  </header>
</template>
  
<script setup lang='ts'>
import projectName from './project-name.vue';

</script>
