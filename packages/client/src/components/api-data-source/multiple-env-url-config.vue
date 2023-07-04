<template>
  <el-tooltip class="item" effect="dark" content="多环境配置 url" placement="top">
    <el-button :icon="Setting" @click="dialogVisible = true" />
    </el-tooltip>
  <el-dialog
    v-model="dialogVisible"
    title="多环境配置url"
    append-to-body
    draggable
  >
    <el-table
      :data="data.envUrl" class="w-full">
      <el-table-column
        prop="name"
        label="环境名"
        width="150px">
      </el-table-column>
      <el-table-column
        label="url">
        <template #default="{ row }">
          <el-input v-model="row.url"></el-input>
      </template>
    </el-table-column>
    </el-table>
    <div class="h-8"></div>
    <el-button type="primary" @click="submitForm">保存配置</el-button>
    <el-button @click="dialogVisible = false">关闭</el-button>
  </el-dialog>
</template>

<script setup lang="ts">
import { Setting } from "@element-plus/icons-vue";
import type { FormInstance } from "element-plus/es/components/form";
import { assignWith } from 'lodash-es';

import { EnvUrl } from "~types";

interface Props {
  envUrl: EnvUrl[];
  url: string;
}
const props = defineProps<Props>();

interface Emits {
  (e: 'updateEnvUrlConfig', envUrl: EnvUrl[]): void,
}
const emits = defineEmits<Emits>();

const formRef = ref<FormInstance>();

const dialogVisible = ref(false);

const data = reactive({
  url: '',
  envUrl: [] as EnvUrl[],
});

watch(dialogVisible, (newVisible) => {
  if (newVisible === true) {
    data.url = props.url;
    data.envUrl = props.envUrl.map(env => {
      // 如果环境本来就有 url 值， 就不获取 api url 替代
      return assignWith({}, env, { url: props.url}, (objValue, srcValue) => objValue ? objValue : srcValue);
    })
  }
});



async function submitForm() {
  emits('updateEnvUrlConfig', data.envUrl);
  dialogVisible.value = false;
}


</script>

<style scoped></style>
