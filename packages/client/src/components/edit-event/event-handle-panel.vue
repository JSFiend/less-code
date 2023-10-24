<template>
  <el-dialog
    v-model="visible"
    title="事件编排"
    @close="closeDialog"
    top="10vh"
    class="event-handle-panel"
  >
    <div class="container">
      <div class="column">
        <div class="header">组件事件</div>
        <div class="content">
          <template v-for="{ label, value, params } in selectedInstance.eventSchema">
            <div class="cursor-pointer p-4 my-4 py-4 first:pt-0 last:pb-0 bg-sky-500 hover:bg-sky-700">
              <div class="m-b-4 font-medium text-slate-900 border-primary border-l-4 p-l-2 dark:text-white">
                {{ value }}: {{ label }}
              </div>
              <template v-for="{ label, value } in params">
                <div class="p-l-10 p-b-2 text-slate-500 truncate dark:text-slate-200">
                  <span>{{ value }}: </span>{{ label }}
                </div>
              </template>
            </div>
          </template>
        </div>
      </div>
      <div class="column">
        <div class="header">互动行为</div>
        <div class="content">内容区域 2</div>
      </div>
      <div class="column">
        <div class="header">行为参数</div>
        <div class="content">内容区域 3</div>
      </div>
    </div>
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
  (e: "update:modelValue", value: boolean): void;
}>();

watchEffect(() => (visible.value = props.modelValue));

const closeDialog = () => {
  emit("update:modelValue", false);
};
</script>
<style scoped lang="scss">
.container {
  display: flex;
  justify-content: space-between;

  .column {
    flex: 1;
    @apply border-primary border-l pb-10;

    &:first-child {
      border-left: none;
    }

    .header {
      @apply border-primary border-b text-xl	p-2 font-bold text-primary;
    }
    .content {
    }
  }
}
</style>
