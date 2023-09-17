<template>
  <!-- 默认数据 -->
  <div class="flex flex-wrap">
    <el-card class="mr-4.5 mb-4.5 w-96" v-for="item in defaultDataList" :key="item.name">
      <template #header>
        <div class="card-header flex justify-between">
          <span>{{ item.name }}</span>
        </div>
      </template>
      <el-descriptions :column="1">
        <el-descriptions-item label-class-name="w-24 " label-align="right" label="描述">{{
          item.desc
        }}</el-descriptions-item>
        <el-descriptions-item
          label-class-name="w-24 "
          label-align="right"
          label="表达式"
          >{{ item.expression }}</el-descriptions-item
        >
        <el-descriptions-item
          label-class-name="w-24 "
          label-align="right"
          label="具体值"
          >{{ state[item.name] }}</el-descriptions-item
        >
      </el-descriptions>
    </el-card>
  </div>
  <!-- 默认数据 end -->
</template>

<script setup lang="ts">
import { useDataSourceStore } from "@/components/data-source/data-source-store";

const { defaultDataList, state } = toRefs(useDataSourceStore());
</script>

<style scoped></style>
./data-source-store
