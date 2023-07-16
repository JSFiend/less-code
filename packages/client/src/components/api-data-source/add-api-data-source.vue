<template>
  <el-link :underline="false" size="small" @click="dialogVisible = true"
    >添加接口数据源</el-link
  >
  <el-drawer
    v-model="dialogVisible"
    title="添加接口数据源"
    append-to-body
    direction="ttb"
    size="100%"
  >
    <template #default>
      <el-form :model="data" label-width="120px" ref="formRef" :rules="rules">
        <el-form-item label="接口名" required prop="name">
          <el-input
            v-model.trim="data.name"
            placeholder="只能包括字母、数字、下横线、$符，不能以数字开头"
            clearable
          >
            <template #prepend>state.</template>
          </el-input>
        </el-form-item>
        <el-form-item label="描述" prop="desc">
          <el-input v-model.trim="data.desc"></el-input>
        </el-form-item>
        <el-form-item label="请求路径" required prop="url">
          <el-input v-model.trim="data.url" placeholder="eg: /sys/getDetail">
            <template #prepend>
              <el-select v-model="data.method" style="width: 100px">
                <el-option v-for="item in ApiMethod" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </template>
            <template #append>
              <multiple-env-url-config :url="data.url" :envUrl="data.envUrl" @update-env-url-config="updateEnvUrlConfig"></multiple-env-url-config>
      </template>
          </el-input>
        </el-form-item>
        <el-form-item label="响应数据结构" required prop="responseStructure">
          <monaco-editor v-model.trim="data.responseStructure" language="json"></monaco-editor>
        </el-form-item>
      </el-form>
      <el-divider content-position="left">接口处理</el-divider>
      <div>
        <div class="w-2/3 mb-24">
          <el-tabs v-model="activePlugin">
            <el-tab-pane label="参数修剪" name="prePlugin">
              <monaco-editor v-model.trim="data.prePlugin" language="typescript"></monaco-editor>
            </el-tab-pane>
            <el-tab-pane label="响应修剪" name="postPlugin">
              <monaco-editor v-model.trim="data.postPlugin" language="typescript"></monaco-editor>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div class="w-1/3">
        </div>
      </div>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="dialogVisible = false">关闭</el-button>
        <el-button type="primary" @click="submitForm(formRef)">添加</el-button>
      </div>
    </template>
  </el-drawer>
</template>
<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus';
import type { ApiDataSource, EnvUrl } from '~types';
import { DataSourceType } from "~types";
import { useDataSource } from "@/components/data-source/store";
import { ApiMethod } from '~types/data-source';
import { useEnvironmentStore } from "@/components/environment/store";

const monacoEditor = defineAsyncComponent(() => import('@/components/monano-editor/monaco-editor.vue'));

const dataSource = useDataSource();

const formRef = ref<FormInstance>();

const dialogVisible = ref(false);

const { environment } = storeToRefs(useEnvironmentStore());

const activePlugin = ref('prePlugin');

const data = reactive<ApiDataSource>({
  name: "",
  desc: "",
  type: DataSourceType.ApiDataSource,
  method: ApiMethod.GET,
  url: '',
  envUrl: environment.value.map(env => Object.assign({}, env, { url: '' })),
  responseStructure: '',
  prePlugin: '',
  prePlugins: [],
  postPlugin: '',
  postPlugins: [],
});

function updateEnvUrlConfig(envUrl: EnvUrl[]) {
  data.envUrl = envUrl;
}

const rules = reactive<FormRules<any>>({
  name: [
    {
      required: true,
      message: "只能包括字母、数字、下横线、$符，不能以数字开头",
      trigger: "blur",
    },
  ],
  url: [
    {
      required: true,
      message: "请填入值",
      trigger: "blur",
    },
  ],
  responseStructure: [
    {
      required: true,
      message: "请填入响应json结构",
      trigger: "blur",
    },
    {
      trigger: "blur",
      validator(rule, value, callback) {
        try {
          JSON.parse(value);
          callback();
        } catch (error) {
          callback('JSON 不规范');
        }
      }
    }
  ],
});

async function submitForm(formEl: FormInstance | undefined) {
  if (!formEl) return;
  await formEl.validate((valid: boolean, fields: any) => {
    if (valid) {
      console.log("submit!", data);
      dataSource.addDataSource(data);
    } else {
      console.log("error submit!", fields);
    }
  });
}

function resetForm(formEl: FormInstance | undefined) {
  if (!formEl) return;
  formEl.resetFields();
}
</script>

<style scoped></style>
~types/data-source~types/data-source
