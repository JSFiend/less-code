<template>
  <!-- 页面变量 -->
  <div class="flex flex-wrap">
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
              @click="openEditDataSource(item)"
              type="warning"
              :icon="CopyDocument"
              circle
            />
            <el-button
              size="small"
              @click="openEditDataSource(item)"
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
        <el-descriptions-item
          label-class-name="w-24 "
          label-align="right"
          label="url"
          >{{ item.url}}</el-descriptions-item>
          <el-descriptions-item
          label-class-name="w-24 "
          label-align="right"
          label="请求办法"
          >{{ item.method}}</el-descriptions-item>
        <el-descriptions-item
          label-class-name="w-24 "
          label-align="right"
          label="具体值"
          >{{ state[item.name] }}</el-descriptions-item
        >
      </el-descriptions>
    </el-card>
  </div>
  <!-- 页面变量 end -->
</template>

<script setup lang="ts">
import { useDataSource } from "@/components/data-source/store";
import { Edit, CopyDocument, Delete } from "@element-plus/icons-vue";

const { apiDataSourceList, state } = toRefs(useDataSource());

function openEditDataSource(a: any) {
  console.log(a);
}
</script>

<style scoped></style>
