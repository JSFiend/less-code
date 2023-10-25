<template>
  <el-dialog
    v-model="eventPanelVisible"
    title="事件编排"
    top="10vh"
    class="event-handle-panel"
  >
    <div class="container">
      <div class="column">
        <div class="header">组件事件</div>
        <div class="content">
          <template v-for="{ label, value, params } in selectedInstance.eventSchema">
            <div
              class="cursor-pointer p-2 m-2 hover:bg-teal-100 hover:dark:bg-teal-700 rounded-lg [&.active]:bg-teal-100 [&.active]:dark:bg-teal-700"
              :class="{ active: value === activeEvent }"
              @click="changeEvent(value)"
            >
              <div
                class="m-b-4 font-medium text-gray-900 border-primary border-l-4 p-l-2 dark:text-white"
              >
                {{ value }}: {{ label }}
              </div>
              <template v-for="{ label, value } in params">
                <div class="p-l-10 p-b-2 text-gray-500 truncate dark:text-gray-200">
                  {{ value }}: {{ label }}
                </div>
              </template>
            </div>
          </template>
        </div>
      </div>
      <div class="column">
        <div class="header">互动行为</div>
        <div class="content">
          <div class="flex justify-center mt-2">
            <el-button type="primary" @click="actionPanelVisible = true">添加行为</el-button>
            <action-panel :eventName="activeEvent"></action-panel>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="header">行为参数</div>
        <div class="content">内容区域 3</div>
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { useEventStore } from "@/components/edit-event/edit-event-store";

import { useComponentInstanceStore } from "@/store/component-instance-store";

const componentInstanceStore = useComponentInstanceStore();

const { selectedInstance } = toRefs(componentInstanceStore);

const eventStore = useEventStore();

const { eventPanelVisible, actionPanelVisible } = toRefs(eventStore);

// 当前选中的事件
const activeEvent = ref("");

watchEffect(() => {
  // 刚打开选择第一个事件为选中
  if (eventPanelVisible.value) {
    activeEvent.value = selectedInstance.value?.eventSchema[0].value;
  }
});

// 切换选中的事件
function changeEvent(event: string) {
  activeEvent.value = event;
}

// 当前选中的事件
const currentEvent = computed(() =>
  selectedInstance.value?.eventSchema.find((item) => item.value === activeEvent.value)
);
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
