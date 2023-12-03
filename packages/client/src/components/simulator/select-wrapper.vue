<template>
  <template v-if="selectedInstance">
    <div class="select-wrapper" id="select-wrapper">
      <div class="select-wrapper-operator">
        <div>
          <div>{{ selectedInstance.baseData.name }}</div>
        </div>
        <div class="select-component-operator">
          <!-- 操作 -->
          <div @click="deleteInstance">删除</div>
        </div>
      </div>
    </div>
  </template>
</template>

<script setup lang="ts">
import { useComponentInstanceStore } from "@/store/component-instance-store";
const componentInstanceStore = useComponentInstanceStore();
const { instanceList, selectedInstance } = toRefs(componentInstanceStore);
import { changeSelectedWrapperStyle } from './simulator';

watchEffect(() => {
  if (selectedInstance.value) {
    changeSelectedWrapperStyle();
  }
});

function deleteInstance() {
  if (!selectedInstance.value) return;
  componentInstanceStore.deleteInstance(selectedInstance.value);
}
</script>
<style lang="scss" scoped>
.select-wrapper {
  @apply border border-primary relative;
  box-shadow: 0px 0px 6px -1px #5eead4;
  pointer-events: none;
  .select-wrapper-operator {
    @apply flex justify-end text-white h-6 relative;
    height: 1.5rem;
    top: -1.5rem;
    right: -1px;
    > div {
      @apply bg-primary shrink-0 inline-block leading-6 px-2 ml-2;
    }
    .select-component-operator {
      pointer-events: all;
      & > div {
        @apply cursor-pointer;
      }
    }
  }
}
</style>
