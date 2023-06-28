<template>
    <el-dropdown >
      <el-button size="small" type="primary">
        添加数据源<el-icon class="el-icon--right"><arrow-down /></el-icon>
      </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item><AddPageVariable></AddPageVariable></el-dropdown-item>
          <el-dropdown-item><add-api-data-source></add-api-data-source></el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>