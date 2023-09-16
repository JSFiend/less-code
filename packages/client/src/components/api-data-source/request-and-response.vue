<template>
  <div>
    <el-button type="primary" @click="dialogVisible = true">输入请求参数结构与响应结构</el-button>
    <el-dialog 
      :model-value="dialogVisible" 
      @update:model-value="dialogVisible = $event" 
      title="请求体和响应体"
      append-to-body
    >
      <div style="margin-bottom: 20px;">
        <label style="display: block; margin-bottom: 10px;">请求体</label>
        <monaco-editor v-model.trim="localData.request" language="json"></monaco-editor>
      </div>
      <div style="margin-bottom: 20px;">
        <label style="display: block; margin-bottom: 10px;">响应体</label>
        <monaco-editor v-model.trim="localData.response" language="json"></monaco-editor>
      </div>
      <span slot="footer" class="dialog-footer" style="margin-top: 20px;">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmDialog">确认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";
import { isJsObject } from "@/utils"; // 修改导入路径

const props = defineProps({
  request: {
    type: String,
    default: "",
  },
  response: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:request", "update:response"]);

const localData = ref({
  request: props.request,
  response: props.response,
});

const dialogVisible = ref(false);

function confirmDialog () {
  const [isRequestValid, requestJson] = isJsObject(localData.value.request);
  const [isResponseValid, responseJson] = isJsObject(localData.value.response);

  if (isRequestValid && isResponseValid) {
    emit("update:request", requestJson);
    emit("update:response", responseJson);
    dialogVisible.value = false;
  } else {
    // Notify the user with a message
    ElMessage({
      message: "json 对象不合法",
      type: "warning",
      duration: 3000,
    });
  }
};

watch(
  () => ({ request: props.request, response: props.response }),
  (newProps) => {
    localData.value.request = newProps.request;
    localData.value.response = newProps.response;
  }
);
</script>
