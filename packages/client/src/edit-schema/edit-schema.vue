<template>
  <div class="p2">
    <VueForm
      :modelValue="props.modelValue"
      @update:modelValue="updateValue"
      :schema="props.schema"
      :formFooter="formFooter"
    >
    </VueForm>
  </div>
</template>

<script setup lang="ts">
import VueForm from "@lljj/vue3-form-element";
import { merge } from "lodash-es";

const props = defineProps({
  modelValue: {
    type: Object,
    defalut: () => ({}),
  },
  schema: {
    type: Object,
    defalut: () => ({}),
  },
});

const emit = defineEmits(["update:modelValue"]);
/**
 *
 * @param props.modelValue
 * 不采取双向绑定 modelValue， 因为 vueForm 会把 schema 多余的 key 删掉。
 * 采取 merge 递归合并
 */
function updateValue(value: Record<string, any>) {
  console.log("merge({}, props.modelValue, value)", props.modelValue, value);
  console.log("merge({}, props.modelValue, value)", merge({}, props.modelValue, value));
  emit("update:modelValue", merge({}, props.modelValue, value));
}

const formFooter = {
  show: false, // 是否显示默认底部
  okBtn: "保存", // 确认按钮文字
  okBtnProps: { type: "primary" }, // 传递确认按钮的 props，例如配置按钮 loading 状态 okBtnProps: { loading: true }
  cancelBtn: "取消", // 取消按钮文字

  // 透传给formFooter 中的formItem组件的参数
  // 例如 vue3-ant 配置wrapperCol  formItemAttrs = { wrapperCol: { span: 10, offset: 5 }}
  formItemAttrs: {},
};
</script>

<style scoped></style>
