<template>
  <el-drawer
    v-model="isOpenApiDataSourcePanel"
    :title="isEdit ? '编辑接口数据源' : '添加接口数据源'"
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
                :disabled="isEdit"
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
            <el-form-item label="请求响应结构" required prop="response">
              <request-and-response-structure
                :request="data.request"
                :response="data.response"
                @update:request="data.request = $event"
                @update:response="data.response = $event"
              ></request-and-response-structure>
            </el-form-item>
            <el-form-item label="请求响应插件" required prop="postPlugin">
              <request-and-response-plugin
                :prePlugin="data.prePlugin"
                :postPlugin="data.postPlugin"
                @update:prePlugin="data.prePlugin = $event"
                @update:postPlugin="data.postPlugin = $event"
              ></request-and-response-plugin>
            </el-form-item>
            <el-form-item label="请求默认参数">
              <parse-param-table :json-data="data.ActualRequest"></parse-param-table>
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
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="isOpenApiDataSourcePanel = false">关闭</el-button>
        <el-button type="primary" @click="submitForm(formRef)">{{
          isEdit ? "更新" : "添加"
        }}</el-button>
      </div>
    </template>
  </el-drawer>
</template>
<script setup lang="ts">
import type { FormInstance, FormRules } from "element-plus";
import type { ApiDataSource, EnvUrl, ActualRequestItem } from "~types";
import { DataSourceType } from "~types";
import { useApiDataSourceStore } from "@/components/api-data-source/api-data-source-store";
import { ApiMethod } from "~types/data-source";
import { useEnvironmentStore } from "@/components/environment/store";
import { debugRequest } from "@/utils";
import { cloneDeep, mergeWith, has } from "lodash-es";

const monacoEditor = defineAsyncComponent(
  () => import("@/components/monano-editor/monaco-editor.vue")
);

const apiDataSourceStore = useApiDataSourceStore();

const { isEdit, currentEditApiDataSource, isOpenApiDataSourcePanel } = toRefs(
  apiDataSourceStore
);

const formRef = ref<FormInstance>();

const { environment } = storeToRefs(useEnvironmentStore());

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

const initData: ApiDataSource = {
  name: "",
  desc: "",
  type: DataSourceType.ApiDataSource,
  method: ApiMethod.GET,
  url: "",
  envUrl: environment.value.map((env) => Object.assign({}, env, { url: "" })),
  request: "{}",
  response: "{}",
  ActualRequest: {},
  prePlugin,
  prePlugins: [],
  postPlugin,
  postPlugins: [],
};

const data = ref<ApiDataSource>(cloneDeep(initData));

watch(isOpenApiDataSourcePanel, (isOpenApiDataSourcePanel) => {
  if (isOpenApiDataSourcePanel === false) {
    data.value = cloneDeep(initData);
  }
});

// 请求体改变，更新实参，并以实参的值为准
watch(
  () => data.value.request,
  (request) => {
    request = JSON.parse(request);
    mergeWith(
      data.value.ActualRequest,
      request,
      (objValue, srcValue, key, object, source) => {
        console.log('objValue, srcValue, key, object, source', objValue, srcValue, key, object, source);
        // 如果目标对象有某属性，但源对象没有，删除该属性
        if (!has(source, key)) {
          delete object[key];
        }
        // 返回 objValue 以保持目标对象的值不变
        return objValue;
      }
    );
  }
);

// 编辑状态，把编辑数据覆盖添加数据
watch(
  isEdit,
  (isEdit) => {
    console.log("isEdit", isEdit);
    if (isEdit) {
      data.value = cloneDeep(currentEditApiDataSource.value!);
    } else {
      data.value = cloneDeep(initData);
    }
  },
  {
    immediate: true,
  }
);

function updateEnvUrlConfig(envUrl: EnvUrl[]) {
  data.value.envUrl = envUrl;
}

function updateValue(key: string, value: any) {
  data.value.ActualRequest[key] = value;
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
        if (!isDebug) {
          if (isEdit.value) {
            // 编辑
            apiDataSourceStore.editApiDataSource(data.value);
          } else {
            // 新增
            const isAddSuccess = apiDataSourceStore.addApiDataSource(data.value);
            if (!isAddSuccess) return false;
          }
          isOpenApiDataSourcePanel.value = false;
        }
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
    url:
      data.value.envUrl.find((env) => env.env === debugEnv.value)?.url || data.value.url,
    method: data.value.method,
    prePlugin,
    postPlugin,
  };
  await debugRequest(options);
}
</script>

<style scoped></style>
