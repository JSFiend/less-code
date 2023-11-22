<template>
  <div>
    <div class="flex justify-center mt-2">
      <el-button type="primary" @click="actionPanelVisible = true">添加行为</el-button>
    </div>
    <ul class="action-content">
      <template v-for="(action, index) in props.actionList">
        <li @click="selectAction(action)" :class="{ active: action === activeAction }">
          <span
            class="mr-6 bg-primary rounded-full inline-block center w-6 h-6 text-center leading-6"
            >{{ index + 1 }}</span
          >
          {{ action.label }}
          <span
            class="mr-6 bg-red rounded-full inline-block center w-6 h-6 text-center leading-6 float-right"
            @click="removeAction(action)"
            >-</span
          >
        </li>
      </template>
    </ul>
  </div>
  <action-panel :action-list="props.actionList"></action-panel>
</template>

<script setup lang="ts">
import { useEventStore } from "@/components/edit-event/edit-event-store";

import { remove } from "lodash-es";

const eventStore = useEventStore();

const { actionPanelVisible, activeAction } = toRefs(eventStore);
import type { Action } from "~types";

const props = defineProps<{
  actionList: Action[];
}>();


const selectAction = (action: Action) => {
  activeAction.value = action;
};

// 删除行为
function removeAction(action: Action) {
  console.log('props.actionList, action', props.actionList, action);
  if (action === activeAction.value) {
    activeAction.value = {};
  }
  remove(props.actionList, function(n) {
  return n  === action;
});
}
</script>

<style scoped lang="scss">
.action-content {
  @apply mt-4;
  li {
    @apply pl-4 py-4 cursor-pointer hover:bg-teal-100 hover:dark:bg-primary dark:text-white [&.active]:bg-teal-100 [&.active]:dark:bg-primary;
  }
}
</style>
