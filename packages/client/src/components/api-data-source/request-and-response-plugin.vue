<template>
  <div>
    <el-button type="primary" @click="dialogVisible = true">请求体和响应体插件</el-button>
    <el-dialog 
      :model-value="dialogVisible" 
      @update:model-value="dialogVisible = $event" 
      title="请求体和响应体"
      append-to-body
    >
      <div style="margin-bottom: 20px;">
        <label style="display: block; margin-bottom: 10px;">请求体</label>
        <monaco-editor v-model.trim="localData.prePlugin" language="javascript"></monaco-editor>
      </div>
      <div style="margin-bottom: 20px;">
        <label style="display: block; margin-bottom: 10px;">响应体</label>
        <monaco-editor v-model.trim="localData.postPlugin" language="javascript"></monaco-editor>
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
import { isFunctionString } from "@/utils"; // 修改导入路径

const props = defineProps({
  prePlugin: {
    type: String,
    default: "",
  },
  postPlugin: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:prePlugin", "update:postPlugin"]);

const localData = ref({
  prePlugin: props.prePlugin,
  postPlugin: props.postPlugin,
});

const dialogVisible = ref(false);

function confirmDialog () {
  const isPrePlugin = isFunctionString(localData.value.prePlugin);
  const isPostPlugin = isFunctionString(localData.value.postPlugin);

  if (isPrePlugin && isPostPlugin) {
    emit("update:prePlugin", localData.value.prePlugin);
    emit("update:postPlugin", localData.value.postPlugin);
    dialogVisible.value = false;
  } else {
    // Notify the user with a message
    ElMessage({
      message: "函数不合法",
      type: "warning",
      duration: 3000,
    });
  }
};

watch(
  () => ({ prePlugin: props.prePlugin, postPlugin: props.postPlugin }),
  (newProps) => {
    console.log('newProps', newProps);
    localData.value.prePlugin = newProps.prePlugin;
    localData.value.postPlugin = newProps.postPlugin;
  }
);
</script>
