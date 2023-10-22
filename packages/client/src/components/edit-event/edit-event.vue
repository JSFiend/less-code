<template>
  <div class="flex justify-center p10">
    <el-button type="primary" @click="showDialog">事件编排</el-button>
  </div>
  <event-handle-panel v-model="dialogVisible" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const dialogVisible = ref(false);

const showDialog = () => {
  dialogVisible.value = true;
};
</script>
