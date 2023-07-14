<template>
    <div class="my-4 flex items-center text-sm">
      <el-radio-group v-model="switchDataSourceType" class="ml-4">
        <el-radio :label="DataSourceType.All" size="small">全部</el-radio>
        <el-radio :label="DataSourceType.UrlParams" size="small">默认</el-radio>
        <el-radio :label="DataSourceType.PageVariable" size="small">页面变量</el-radio>
        <el-radio :label="DataSourceType.ApiDataSource" size="small">接口数据源</el-radio>
      </el-radio-group>
  </div>
  <div class="flex flex-wrap">

    <el-card class="mr-4.5 mb-4.5 w-96" v-for="item in collection" :key="item.name">
      <template #header>
        <div class="card-header flex justify-between">
          <span>{{ item.name }}</span>
          <div v-if="item.type != DataSourceType.UrlParams">
            <el-button size="small" @click="openEditDataSource(item)" type="primary" :icon="Edit" circle />
            <el-button size="small" @click="copyDataSource(item)" type="warning" :icon="CopyDocument" circle />
            <el-button size="small" @click="deleteDataSource(item)" type="danger" :icon="Delete" circle />
          </div>
        </div>
      </template>
      <!-- 页面变量 -->
      <el-descriptions :column="1" v-if="item.type === DataSourceType.PageVariable || item.type === DataSourceType.UrlParams">
        <el-descriptions-item label-class-name="w-24 " label-align="right" label="描述">{{ item.desc }}</el-descriptions-item>
        <el-descriptions-item label-class-name="w-24 " label-align="right" label="表达式">{{ item.expression }}</el-descriptions-item>
        <el-descriptions-item label-class-name="w-24 " label-align="right" label="具体值">{{ state[item.name] }}</el-descriptions-item>
      </el-descriptions>
      <!-- 页面变量 end -->
    </el-card>
    <edit-page-variable  :data-source="pageVariableDataSource" v-model="pageVariableDataSourceVisible"></edit-page-variable>
  </div>
</template>

<script setup lang="ts">
import { useDataSource } from '@/components/data-source/store';
import type { DataSourceItem, PageVariable } from '~types';
import { DataSourceType } from '~types';
import {
	Edit,
	CopyDocument,
	Delete,
} from '@element-plus/icons-vue';

const dataSource = useDataSource();

const { deleteDataSource, copyDataSource } = dataSource;

const { state } = storeToRefs(dataSource);

const pageVariableDataSourceVisible = ref(false);
let pageVariableDataSource = ref<PageVariable>({} as PageVariable);

function openEditDataSource(dataSource: DataSourceItem) {
  if (dataSource.type === DataSourceType.PageVariable) {
    pageVariableDataSourceVisible.value = true;
    pageVariableDataSource.value = dataSource;
  }
}

const switchDataSourceType = ref<DataSourceType>(DataSourceType.All);
// 要显示的集合
const collection = computed(() => {
  if (switchDataSourceType.value === DataSourceType.All) {
    return dataSource.list;
  };
  return dataSource.list.filter(item => item.type === switchDataSourceType.value);
});

</script>

<style scoped>

</style>