<template>
    <!-- 默认数据 -->
    <el-card class="mr-4.5 mb-4.5 w-96" v-for="item in defaultDataList" :key="item.name">
      <template #header>
        <div class="card-header flex justify-between">
          <span>{{ item.name }}</span>
        </div>
      </template>
      <el-descriptions :column="1">
        <el-descriptions-item label-class-name="w-24 " label-align="right" label="描述">{{ item.desc }}</el-descriptions-item>
        <el-descriptions-item label-class-name="w-24 " label-align="right" label="表达式">{{ item.expression }}</el-descriptions-item>
        <el-descriptions-item label-class-name="w-24 " label-align="right" label="具体值">{{ state[item.name] }}</el-descriptions-item>
      </el-descriptions>
    </el-card>
    <!-- 默认数据 end -->
</template>

<script setup lang="ts">
import { useDataSource } from './store';

const { defaultDataList, state } = toRefs(useDataSource());

</script>

<style scoped>

</style>