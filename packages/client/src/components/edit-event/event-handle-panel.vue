<template>
  <el-dialog v-model="visible" title="事件编排" @close="closeDialog">
    <span>This is the content of the dialog.</span>
    {{ selectedInstance.event }}
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">Close</el-button>
    </span>
  </el-dialog>
</template>

<script setup lang="ts">
import { useComponentInstanceStore } from "@/store/component-instance-store";

const componentInstanceStore = useComponentInstanceStore();

const { selectedInstance } = toRefs(componentInstanceStore);





const visible = ref(false);

const props = defineProps({
  modelValue: Boolean,
});
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void,
}>()

watchEffect(() => visible.value = props.modelValue);

const closeDialog = () => {
  emit('update:modelValue', false)
};
</script>
