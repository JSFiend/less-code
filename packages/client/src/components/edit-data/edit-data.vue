<template>
  <div class="p2" v-if="selectedInstance">
    <VueForm v-model="selectedInstance.data" :schema="selectedInstance.dataSchema" :formFooter="formFooter"> </VueForm>
  </div>
</template>

<script setup lang="ts">
import VueForm from "@lljj/vue3-form-element";
import { useComponentInstanceStore } from "@/store/component-instance-store";

const componentInstanceStore = useComponentInstanceStore();

const { selectedInstance } = toRefs(componentInstanceStore);

const formFooter = {
    show: false, // 是否显示默认底部
    okBtn: '保存', // 确认按钮文字
    okBtnProps: { type: 'primary' }, // 传递确认按钮的 props，例如配置按钮 loading 状态 okBtnProps: { loading: true }
    cancelBtn: '取消', // 取消按钮文字

    // 透传给formFooter 中的formItem组件的参数
    // 例如 vue3-ant 配置wrapperCol  formItemAttrs = { wrapperCol: { span: 10, offset: 5 }}
    formItemAttrs: {}
}
</script>

<style scoped></style>
