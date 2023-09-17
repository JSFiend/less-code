<template>
  <el-link :underline="false" size="small" @click="dialogVisible = true"
    >'添加接口数据源'</el-link
  >
</template>
<script setup lang="ts">
const dialogVisible = ref(false);
</script>