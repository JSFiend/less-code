<template>
  <el-button size="small" type="primary" @click="openDataSourcePane(true)">数据源</el-button>
  <el-dialog
    v-model="dialogVisible"
    title="数据源"
    append-to-body
    :before-close="handleClose"
    width="80%"
    draggable
  >
    <add-data-source></add-data-source>
    <p class="h-8"></p>
    <el-tabs type="border-card">
      <el-tab-pane label="数据源集合"><DataSourceCollection></DataSourceCollection></el-tab-pane>
  </el-tabs>
  </el-dialog>
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
