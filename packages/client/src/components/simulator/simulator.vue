<template>
  <div class="h-full overflow-auto">
  <div
    class="bg-white min-h-full relative flex"
    id="simulator"
    :style="style"
  >
    <el-config-provider namespace="el">
      <render-component :instanceList="instanceList"></render-component>
      <select-wrapper />
    </el-config-provider>
  </div>
</div>
</template>

<script setup lang="ts">
import { useComponentInstanceStore } from "@/store/component-instance-store";
import { usePageConfigStore } from "@/components/page-config/page-config-store";
import { changeSelectedWrapperStyle } from "./simulator";
const componentInstanceStore = useComponentInstanceStore();
const { instanceList } = toRefs(componentInstanceStore);

const { pageConfig } = toRefs(usePageConfigStore());

const style = ref({});

watch(
  pageConfig,
  () => {
    style.value = {
      padding: pageConfig.value.padding + "px",
      margin: pageConfig.value.margin + "px",
    };
  },
  { immediate: true }
);

onMounted(() => {
  // 选择需要观察变动的节点
  const targetNode = document.getElementById("simulator")!;

  // 观察器的配置（需要观察什么变动）
  const config = { attributes: true, childList: true, subtree: true };

  // 当观察到变动时执行的回调函数
  const callback = function (mutationsList: MutationRecord[]) {
    // Use traditional 'for loops' for IE 11
    mutationsList.forEach((mutation: MutationRecord) => {
      const target = mutation.target as Element;

      // 判断target节点是否含有'selected'类
      if (target.classList.contains("selected")) {
        changeSelectedWrapperStyle();
      }
    });
  };

  // 创建一个观察器实例并传入回调函数
  const observer = new MutationObserver(callback);

  // 以上述配置开始观察目标节点
  observer.observe(targetNode, config);
});
</script>

<style lang="scss">
#simulator {
  & > .renderContent {
    @apply flex-1;
  }
}
</style>
