<template>
    <el-dropdown >
      <el-button size="small" type="primary">
        添加数据源<el-icon class="el-icon--right"><arrow-down /></el-icon>
      </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>页面变量</el-dropdown-item>
          <el-dropdown-item>接口数据源</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
</template>

<script setup lang="ts">
import { ArrowDown } from '@element-plus/icons-vue';

</script>

<style scoped>

</style>