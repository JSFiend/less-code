<template>
  <!-- 接口数据源 -->
  <div v-if="apiDataSourceList.length === 0" class="empty-data-container">
    <el-alert
      title="没有API数据源可供显示"
      type="success"
      center
      description="请在左上角添加接口数据源"
    />
  </div>
  <div v-else class="flex flex-wrap">
    <el-card
      class="mr-4.5 mb-4.5 w-96"
      v-for="item in apiDataSourceList"
      :key="item.name"
    >
      <template #header>
        <div class="card-header flex justify-between">
          <span>{{ item.name }}</span>
          <div>
            <el-button
              size="small"
              @click="openEditDataSource(item)"
              type="primary"
              :icon="Edit"
              circle
            />
            <el-button
              size="small"
              @click="copyApiDataSource(item)"
              type="warning"
              :icon="CopyDocument"
              circle
            />
            <el-button
              size="small"
              @click="deleteApiDataSource(item)"
              type="danger"
              :icon="Delete"
              circle
            />
          </div>
        </div>
      </template>
      <el-descriptions :column="1">
        <el-descriptions-item label-class-name="w-24 " label-align="right" label="描述">{{
          item.desc
        }}</el-descriptions-item>
        <el-descriptions-item label-class-name="w-24 " label-align="right" label="url">{{
          item.url
        }}</el-descriptions-item>
        <el-descriptions-item
          label-class-name="w-24 "
          label-align="right"
          label="请求办法"
          >{{ item.method }}</el-descriptions-item
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
  <!-- 接口数据源 end -->
</template>

<script setup lang="ts">
import { useDataSourceStore } from '@/components/data-source/data-source-store';
import { useApiDataSourceStore } from '@/components/api-data-source/api-data-source-store';

import { Edit, CopyDocument, Delete } from "@element-plus/icons-vue";
import { ApiDataSource } from '~types/index';


const { apiDataSourceList, deleteApiDataSource, copyApiDataSource, currentEditApiDataSource, isOpenApiDataSourcePanel } = toRefs(
  useApiDataSourceStore()
);
const { state } = toRefs(useDataSourceStore());

function openEditDataSource(item: ApiDataSource) {
  console.log('item', item);
  isOpenApiDataSourcePanel.value = true;
  currentEditApiDataSource.value = item;
}
</script>

<style scoped></style>
@/components/data-source/data-source-store