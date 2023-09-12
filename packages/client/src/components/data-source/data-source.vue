<template>
  <el-button size="small" type="primary" @click="isOpenDataSourcePanel = true">数据源</el-button>
  <el-dialog
    v-model="isOpenDataSourcePanel"
    title="数据源"
    append-to-body
    width="80%"
    draggable
  >
    <add-data-source></add-data-source>
    <p class="h-8"></p>
    <el-tabs type="border-card" v-model="currentDataSourceTab">
      <el-tab-pane label="默认数据" :name="DataSourceType.DefaultData"><defaultDataListVue></defaultDataListVue></el-tab-pane>
      <el-tab-pane label="页面变量" :name="DataSourceType.PageVariable"><page-variable-list></page-variable-list></el-tab-pane>
      <el-tab-pane label="Api数据源" :name="DataSourceType.ApiDataSource"><api-data-source-list></api-data-source-list></el-tab-pane>
  </el-tabs>
  </el-dialog>
</template>

<script setup lang="ts">

const addDataSource = defineAsyncComponent(() => import('@/components/data-source/add-data-source.vue'));
const defaultDataListVue = defineAsyncComponent(() => import('@/components/data-source/default-data-list.vue'));

import { useDataSource } from '@/components/data-source/store';
import { DataSourceType } from '~types/data-source';

const { isOpenDataSourcePanel, currentDataSourceTab } = toRefs(useDataSource());



</script>

<style scoped></style>
