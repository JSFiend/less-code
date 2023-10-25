<template>
  <el-dialog
    v-model="actionPanelVisible"
    top="10vh"
    :show-close="false"
  >
    <div class="container">
      <div class="column">
        <div class="header">组件事件</div>
        <div class="content">{{ eventName }}</div>
      </div>
      <div class="column">
        <div class="header">互动行为</div>
        <div class="content">
          <div class="flex justify-center mt-2">
            <el-button type="primary">添加行为</el-button>
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
import { stringify } from "uuid";

const componentInstanceStore = useComponentInstanceStore();

const { selectedInstance } = toRefs(componentInstanceStore);

const eventStore = useEventStore();

const { actionPanelVisible } = toRefs(eventStore);

const props = defineProps({
  eventName: String,
});
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
