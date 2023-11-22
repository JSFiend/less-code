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
          <template v-for="event in selectedInstance!.eventSchema">
            <div
              class="cursor-pointer p-2 m-2 hover:bg-teal-100 hover:dark:bg-primary rounded-lg [&.active]:bg-teal-100 [&.active]:dark:bg-primary"
              :class="{ active: event.eventName === activeEvent.eventName }"
              @click="changeEvent(event)"
            >
              <div
                class="m-b-4 font-medium text-gray-900 border-primary dark:border-teal-100 border-l-4 p-l-2 dark:text-white"
              >
                {{ event.eventName }}: {{ event.label }}
              </div>
              <template v-for="{ label, paramName } in event.params">
                <div class="p-l-10 p-b-2 text-gray-500 truncate dark:text-gray-100">
                  {{ paramName }}: {{ label }}
                </div>
              </template>
            </div>
          </template>
        </div>
      </div>
      <div class="column">
        <div class="header">互动行为</div>
        <div class="content">
          <action-list
            :actionList="selectedInstance!.event[activeEvent.eventName]"
          ></action-list>
        </div>
      </div>
      <div class="column">
        <div class="header">行为参数</div>
        <div class="content">
          <edit-schema
            v-if="activeAction.actionName"
            v-model="activeAction.params"
            :schema="activeAction.paramsSchema"
          ></edit-schema>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { useEventStore } from "@/components/edit-event/edit-event-store";

import { useComponentInstanceStore } from "@/store/component-instance-store";

import type { ComponentEvent, ComponentInstance, Action } from "~types";

const componentInstanceStore = useComponentInstanceStore();

const { selectedInstance } = toRefs(componentInstanceStore);

const eventStore = useEventStore();

const { eventPanelVisible, activeAction } = toRefs(eventStore);

// 当前选中的事件
const activeEvent = ref<ComponentEvent>({});

watchEffect(() => {
  // 刚打开选择第一个事件为选中
  if (eventPanelVisible.value) {
    activeEvent.value = selectedInstance.value.eventSchema[0];
  }
});

watchEffect(() => {
  // 当前选中的事件变化的时候，选中第一个行为
  if (selectedInstance.value) {
    if (selectedInstance.value.event[activeEvent.value?.eventName]?.length) {
      activeAction.value = selectedInstance.value.event[activeEvent.value?.eventName][0];
    } else {
      selectedInstance.value.event[activeEvent.value?.eventName] = [];
    }
  }
});

// 切换选中的事件
function changeEvent(event: Record<string, any>) {
  activeEvent.value = event;
  activeAction.value = selectedInstance.value?.event[event.eventName][0] || {};
}
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
  }
}
</style>
