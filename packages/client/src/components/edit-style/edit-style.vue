<template>
  <div class="p2" v-if="selectedInstance">
    <VueForm :modelValue="value" @update:modelValue="updateValue" :schema="selectedInstance.styleSchema" :formFooter="formFooter"> </VueForm>
  </div>
</template>

<script setup lang="ts">
import VueForm from "@lljj/vue3-form-element";
import { useComponentInstanceStore } from "@/store/component-instance-store";
import { merge } from 'lodash-es';

const componentInstanceStore = useComponentInstanceStore();

const { selectedInstance } = toRefs(componentInstanceStore);

const value = ref<Record<string, any> | null>({});


watchEffect(() => value.value = selectedInstance?.value?.style || {});

/**
 * 
 * @param value 
 * 不采取双向绑定 modelValue， 因为 vueForm 会把 schema 多余的 key 删掉。
 * 采取 merge 递归合并
 */
function updateValue(value: Record<string, any>) {
  console.log('value',selectedInstance.value,  value);
  merge(selectedInstance.value.style, value);
}

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
