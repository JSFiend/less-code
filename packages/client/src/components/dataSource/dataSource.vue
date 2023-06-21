<template>
  <el-button size="small" type="primary" @click="openDataSourcePane(true)">数据源</el-button>
  <el-drawer
    v-model="dialogVisible"
    title="数据源"
    direction="ttb"
    :before-close="handleClose"
    size="100%"
  >
    <add-data-source></add-data-source>
    <p class="h-8"></p>
    <el-tabs type="border-card">
      <el-tab-pane label="数据源集合"><DataSourceCollection></DataSourceCollection></el-tab-pane>
      <el-tab-pane label="页面变量">页面变量</el-tab-pane>
      <el-tab-pane label="接口数据源">接口数据源</el-tab-pane>
  </el-tabs>
  </el-drawer>
</template>

<script setup lang="ts">
import qs from 'query-string';
import _ from 'lodash-es';

const openDataSourcePaneParams = !!qs.parse(location.search)?.openDataSourcePane;
const dialogVisible = ref(openDataSourcePaneParams || false);
const router = useRouter();
const route = useRoute();

function openDataSourcePane(val: boolean) {
  dialogVisible.value = val;
  router.push({
    query: {
      openDataSourcePane: 'Y',
    }
  })
}

function handleClose() {
  dialogVisible.value = false;
  const newQuery = _.omit(route.query, 'openDataSourcePane');
  router.push({
    query: newQuery
  })
}
</script>

<style scoped></style>
