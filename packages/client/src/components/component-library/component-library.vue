<template>
  <div class="container">
    <!-- <el-aside style="width: 80px"> -->
      <!-- <el-menu @select="handleCategorySelect" style="height: 100%">
        <el-menu-item
          v-for="(components, category) in mockComponents"
          :key="category"
          :index="category"
          >{{ category }}</el-menu-item
        >
      </el-menu> -->
    <!-- </el-aside> -->
    <el-main>
      <el-scrollbar>
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
    </el-main>
  </div>
</template>

<script lang="ts" setup>
import { componentInstances, opComponents } from "op-kit";
import { ComponentInstance } from '~types';

console.log("libraryComponents", componentInstances, opComponents);

const baseComponents = computed(() =>
  componentInstances?.filter((config) => !config?.baseData?.isContainer)
);

const containerComponents = computed(() =>
  componentInstances?.filter((config) => config?.baseData?.isContainer)
);
</script>

<style scoped>
.container {
  display: flex;
  height: 100%;
}

el-main {
  overflow-y: auto;
  flex-grow: 1;
}

el-aside {
  position: sticky;
  top: 0;
}
</style>
