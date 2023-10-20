<template>
  <div class="container">
    <el-aside style="width: 80px">
      <!-- <el-menu @select="handleCategorySelect" style="height: 100%">
        <el-menu-item
          v-for="(components, category) in mockComponents"
          :key="category"
          :index="category"
          >{{ category }}</el-menu-item
        >
      </el-menu> -->
    </el-aside>
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
import { componentConfigs, opComponents } from "op-kit";

console.log("libraryComponents", componentConfigs, opComponents);

const baseComponents = computed(() =>
  componentConfigs?.filter((config) => !config?.metaData?.isContainer)
);

const containerComponents = computed(() =>
  componentConfigs?.filter((config) => config?.metaData?.isContainer)
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
