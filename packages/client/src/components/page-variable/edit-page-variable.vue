<template>
  <el-dialog
    v-model="dialogVisible"
    title="编辑页面变量"
    append-to-body
    width="50%"
    draggable
    @close="close"
  >
    <el-form :model="data" label-width="80px" ref="formRef" :rules="rules">
      <el-form-item label="变量名" required prop="name">
        <el-input disabled v-model="data.name" placeholder="只能包括字母、数字、下横线、$符，不能以数字开头" clearable>
          <template #prepend>state.</template>
        </el-input>
      </el-form-item>
      <el-form-item label="描述" prop="desc">
        <el-input v-model="data.desc"></el-input>
      </el-form-item>
      <el-form-item label="数据值" prop="expression" required>
        <el-collapse class="w-full">
          <el-collapse-item title="输入框内默认支持变量，写法和 JS 写法完全一致，表达式运行的上下文会有 state、_、qs">
            <div class="whitespace-pre-line">
              {{ text }}
            </div>
          </el-collapse-item>
        </el-collapse>
        <el-input
          v-model="data.expression"
          :autosize="{ minRows: 5 }"
          type="textarea"
          placeholder="支持表达式"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(formRef)">更新页面变量</el-button>
        <el-button @click="dialogVisible = false">关闭</el-button>
      </el-form-item>
    </el-form>

  </el-dialog>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus';
import type { DataSourceItem } from '~types/data-source';
import { DataSourceType } from '~types/data-source';
import { useDataSource } from '@/components/data-source/store';


const props = defineProps<{
  dataSource: DataSourceItem,
  modelValue: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', visible: boolean): void,
}>();

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

let data = reactive<DataSourceItem>({
  name: '',
  desc: '',
  expression: ``,
  type: DataSourceType.PageVariable,
});

watch(() => props, (value) => {
  data = Object.assign(data, value.dataSource);
  dialogVisible.value = value.modelValue;
}, { deep: true });

function close() {
  emit('update:modelValue', false);
}


const rules = reactive<FormRules<RuleForm>>({
  name: [
    { required: true, message: '只能包括字母、数字、下横线、$符，不能以数字开头', trigger: 'blur' },
  ],
  value: [
    {
      required: true,
      message: '请填入值',
      trigger: 'blur',
    },
  ],
});

async function submitForm(formEl: FormInstance | undefined) {
  if (!formEl) return
  await formEl.validate((valid: boolean, fields: any) => {
    if (valid) {
      console.log('submit!', data);
      dataSource.editDataSource(data);
    } else {
      console.log('error submit!', fields)
    }
  })
}

</script>

<style scoped>

</style>~types/data-source~types/data-source