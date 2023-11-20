<template>
  <el-dialog v-model="actionPanelVisible" top="10vh" :show-close="false">
    <div class="container">
      <div class="column">
        <div class="header">UI 交互</div>
        <ul class="content">
          <template v-for="action in uiAction">
            <el-popover
              v-if="action.title"
              trigger="hover"
              placement="top"
              :content="action.title"
            >
              <template #reference>
                <li else @click="addAction(action)">
                  {{ action.label }}
                </li>
              </template>
            </el-popover>
          </template>
        </ul>
      </div>
      <div class="column">
        <div class="header">逻辑行为</div>
        <ul class="content">
          <li></li>
        </ul>
      </div>
      <div class="column">
        <div class="header">页面导航</div>
        <ul class="content">
          内容区域 3
        </ul>
      </div>
      <div class="column">
        <div class="header">外部通知</div>
        <ul class="content">
          内容区域 3
        </ul>
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { useEventStore } from "@/components/edit-event/edit-event-store";

import { useComponentInstanceStore } from "@/store/component-instance-store";
import { ElMessage } from "element-plus";
import { cloneDeep } from "lodash-es";
import { opAction, Action, ComponentInstance } from "op-kit";

const props = defineProps({
  eventName: {
    type: String,
    default: "",
  },
});

const componentInstanceStore = useComponentInstanceStore();

// 这里的页面一定会有 selectedInstance
const { selectedInstance } = toRefs(componentInstanceStore) as {
  selectedInstance: Ref<ComponentInstance>;
};

const eventStore = useEventStore();

const { actionPanelVisible } = toRefs(eventStore);

/**
 * 添加一个行为
 */
function addAction(action: any) {
  action = cloneDeep(action);
  // 去掉行为的函数。 保留他的 param、paramchema 等数据
  delete action.action;
  console.log("action", action);
  if (Array.isArray(selectedInstance.value.event[props.eventName])) {
    selectedInstance.value.event[props.eventName].push(action);
  } else {
    selectedInstance.value.event[props.eventName] = [action];
  }
  // 不关闭添加时间弹窗
  // actionPanelVisible.value = false;
}

// ui 行为
const uiAction = computed(() => opAction.filter((action) => action.type === "UI"));
</script>
<style scoped lang="scss">
.container {
  display: flex;
  justify-content: space-between;

  .column {
    flex: 1;

    &:first-child {
      border-left: none;
    }

    .header {
      @apply border-primary border-l-4 text-xl	pl-2 mb-4 font-bold text-black dark:text-white;
    }
    .content {
      li {
        @apply pl-4 py-4 cursor-pointer hover:bg-teal-100 hover:dark:bg-teal-700 [&.active]:bg-teal-100 [&.active]:dark:bg-teal-700;
      }
    }
  }
}
</style>
