<template>
  <el-button size="small" type="primary" @click="dialogVisible = true"> 环境 </el-button>
  <el-dialog
    v-model="dialogVisible"
    title="环境管理"
    append-to-body
    width="80%"
    draggable
  >
    <el-tabs type="border-card">
      <el-tab-pane label="环境"><environment-list></environment-list></el-tab-pane>
      <el-tab-pane label="版本">Config</el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<script setup lang="ts">
const dialogVisible = ref(false);
</script>

<style scoped></style>
