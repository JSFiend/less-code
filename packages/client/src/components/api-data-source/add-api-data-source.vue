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
      <el-form :model="data" label-width="80px" ref="formRef" :rules="rules">
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
        <el-form-item label="请求路径" required>
          <el-input v-model="data.url" placeholder="eg: /sys/getDetail">
            <template #prepend>
              <el-select v-model="data.method" style="width: 100px">
                <el-option v-for="item in ApiMethod" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </template>
            <template #append>
        <el-button :icon="Setting" @click="" />
      </template>
          </el-input>
        </el-form-item>
        <el-form-item label="数据值" required>
          <el-collapse class="w-full">
            <el-collapse-item
              title="输入框内默认支持变量，写法和 JS 写法完全一致，表达式运行的上下文会有 state、_、qs"
            >
              <div class="whitespace-pre-line">
                {{ text }}
              </div>
            </el-collapse-item>
          </el-collapse>
          <el-input
            v-model.trim="data.url"
            :autosize="{ minRows: 5 }"
            type="textarea"
            placeholder="支持表达式"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(formRef)">添加页面变量</el-button>
          <el-button @click="resetForm(formRef)">重置</el-button>
          <el-button @click="dialogVisible = false">关闭</el-button>
        </el-form-item>
      </el-form>
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
import type { DataSourceItem } from "~types/data-source";
import { DataSourceType } from "~types/data-source";
import { useDataSource } from "@/components/data-source/store";
import { ApiMethod } from '~types/data-source';
import { Setting } from '@element-plus/icons-vue';
import { useEnvironmentStore } from "@/components/environment/store";

const text = `字符串: "string"
              数字: 123
              布尔值: true / false
              对象: {"name": "gaokai"}
              数组: ["1", "2"]
              空值: null
              state引用: state.urlParams.isOpen ? 1 : 0
              `;

const dataSource = useDataSource();

const formRef = ref<FormInstance>();

const dialogVisible = ref(false);

const { environment } = storeToRefs(useEnvironmentStore());

const data = reactive<DataSourceItem>({
  name: "",
  desc: "",
  type: DataSourceType.ApiDataSource,
  method: ApiMethod.GET,
  url: '',
  envUrl: environment.value.map(env => Object.assign({}, env, { url: '' })),
});

const rules = reactive<FormRules<RuleForm>>({
  name: [
    {
      required: true,
      message: "只能包括字母、数字、下横线、$符，不能以数字开头",
      trigger: "blur",
    },
  ],
  value: [
    {
      required: true,
      message: "请填入值",
      trigger: "blur",
    },
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
