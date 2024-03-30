<template>
  <div class="w-full h-full flex py-2 pl-2">
    <el-scrollbar class="w-full">
      <!-- 容器组件 -->
      <div>
        <h3>容器组件</h3>
        <div class="component-list">
          <component-info :components-info="containerComponents" />
        </div>
      </div>
      <!-- 容器组件 end -->
      <!-- 基础组件 -->
      <div>
        <h3>基础组件</h3>
        <div class="component-list">
          <component-info :components-info="baseComponents" />
        </div>
      </div>
      <!-- 基本组件 end -->
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import { componentInstances, opComponents } from "op-kit";
import { ComponentInstance } from "~types";

console.log("libraryComponents", componentInstances, opComponents);

const baseComponents = computed(() =>
  componentInstances?.filter((config) => !config?.baseData?.isContainer)
);

const containerComponents = computed(() =>
  componentInstances?.filter((config) => config?.baseData?.isContainer)
);
</script>

<style scoped>
</style>
