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
      <div class="flex">
        <el-card class="w-2/4 mr-4">
          <template #header>
            <div class="text-2xl">
              <span>基本信息</span>
            </div>
          </template>
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
                    <el-option
                      v-for="item in ApiMethod"
                      :key="item"
                      :label="item"
                      :value="item"
                    ></el-option>
                  </el-select>
                </template>
                <template #append>
                  <multiple-env-url-config
                    :url="data.url"
                    :envUrl="data.envUrl"
                    @update-env-url-config="updateEnvUrlConfig"
                  ></multiple-env-url-config>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item label="响应数据结构" required prop="response">
              <request-and-response
                :request="data.request"
                :response="data.response"
                @update:request="data.request = $event"
                @update:response="data.response = $event"
              ></request-and-response>
            </el-form-item>
          </el-form>
        </el-card>
        <!-- 调试接口 -->
        <el-card class="w-2/4 ml-4">
          <template #header>
            <div class="flex items-center justify-between text-2xl">
              <span>调试接口</span>
              <div>
                <el-select v-model="debugEnv" class="mr-4">
                  <el-option
                    v-for="item in environment"
                    :key="item.env"
                    :label="item.name"
                    :value="item.env"
                  />
                </el-select>
                <el-button type="primary" class="button" @click="doDebugRequest"
                  >调试</el-button
                >
              </div>
            </div>
          </template>
          <el-tabs class="demo-tabs">
            <el-tab-pane label="请求信息" name="first">User</el-tab-pane>
            <el-tab-pane label="响应信息" name="second">Config</el-tab-pane>
            <el-tab-pane label="请求结果" name="third">Role</el-tab-pane>
          </el-tabs>
        </el-card>
        <!-- 调试接口 env -->
      </div>
      <el-card class="mt-4">
        <template #header>
          <div class="flex items-center justify-between text-2xl">
            <span>接口处理</span>
          </div>
        </template>
        <el-tabs>
          <el-tabs v-model="activePlugin">
            <el-tab-pane label="参数修剪" name="prePlugin">
              <monaco-editor
                v-model.trim="data.prePlugin"
                language="javascript"
              ></monaco-editor>
            </el-tab-pane>
            <el-tab-pane label="响应修剪" name="postPlugin">
              <monaco-editor
                v-model.trim="data.postPlugin"
                language="javascript"
              ></monaco-editor>
            </el-tab-pane>
          </el-tabs>
        </el-tabs>
      </el-card>
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
import type { FormInstance, FormRules } from "element-plus";
import type { ApiDataSource, EnvUrl } from "~types";
import { DataSourceType } from "~types";
import { useDataSource } from "@/components/data-source/store";
import { ApiMethod } from "~types/data-source";
import { useEnvironmentStore } from "@/components/environment/store";
import { debugRequest } from "@/utils";

const monacoEditor = defineAsyncComponent(
  () => import("@/components/monano-editor/monaco-editor.vue")
);

const dataSource = useDataSource();

const formRef = ref<FormInstance>();

const dialogVisible = ref(false);

const { environment } = storeToRefs(useEnvironmentStore());

const activePlugin = ref("prePlugin");

const debugEnv = ref("dev");

const prePlugin = `function prePlugin(data, headers) {
  console.log('data', data);
  console.log('headers', headers);
}
`;

const postPlugin = `function prePlugin(response, data, headers) {
  console.log('data', data);
  console.log('headers', headers);
  console.log('response', response);
}
`;

const data = reactive<ApiDataSource>({
  name: "",
  desc: "",
  type: DataSourceType.ApiDataSource,
  method: ApiMethod.GET,
  url: "",
  envUrl: environment.value.map((env) => Object.assign({}, env, { url: "" })),
  request: "{}",
  response: "{}",
  prePlugin,
  prePlugins: [],
  postPlugin,
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
  response: [
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
          callback("JSON 不规范");
        }
      },
    },
  ],
});

async function submitForm(
  formEl: FormInstance | undefined = formRef.value,
  isDebug = false
) {
  if (!formEl) return;
  return new Promise(async (resolve, reject) => {
    await formEl.validate((valid: boolean, fields: any) => {
      if (valid) {
        console.log("submit!", data);
        // 不是debug 就提交
        if (!isDebug) dataSource.addApiDataSource(data);
        return resolve(data);
      }
      console.log("error submit!", fields);
      reject("error submit!");
    });
  });
}

function resetForm(formEl: FormInstance | undefined) {
  if (!formEl) return;
  formEl.resetFields();
}

async function doDebugRequest() {
  await submitForm(formRef.value, true);
  const options = {
    url: data.envUrl.find((env) => env.env === debugEnv.value)?.url || data.url,
    method: data.method,
    prePlugin,
    postPlugin,
  };
  await debugRequest(options);
}
</script>

<style scoped></style>
