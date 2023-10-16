<template>
  <div class="container">
    <el-aside style="width: 80px">
      <el-menu @select="handleCategorySelect" style="height: 100%">
        <el-menu-item
          v-for="(components, category) in mockComponents"
          :key="category"
          :index="category"
          >{{ category }}</el-menu-item
        >
      </el-menu>
    </el-aside>
    <el-main>
      <el-scrollbar>
        <!-- 基础组件 -->
        <div>
          <h3>基础组件</h3>
          <div class="component-list">
            <div
              class="component-item"
              v-for="{ metaData } in baseComponents"
              :key="metaData.name"
            >
              <el-icon :size="20" v-if="metaData.icon">
                <img :src="metaData.icon" />
              </el-icon>
              <p>{{ metaData.name }}</p>
            </div>
          </div>
        </div>
        <!-- 基本组件 end -->
        <div
          v-for="(components, category) in mockComponents"
          :key="category"
          :id="category"
        >
          <h3>{{ category }}</h3>
          <div class="component-list">
            <div
              class="component-item"
              v-for="component in components"
              :key="component.name"
            >
              <el-icon :size="20" v-if="component.icon">
                <component :is="component.icon"></component>
              </el-icon>
              <p>{{ component.name }}</p>
            </div>
          </div>
        </div>
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

interface ComponentMetadata {
  type: string; // 组件类型
  name: string; // 组件名称
  icon: string; // 组件图标
  // 其他你需要的属性...
}

const mockComponents: Record<string, ComponentMetadata[]> = {
  布局: [
    { type: "布局", name: "容器", icon: "path_to_icon" },
    // ...其他布局组件
  ],
  按钮: [
    { type: "按钮", name: "主要按钮", icon: "path_to_icon" },
    { type: "按钮", name: "主要按钮", icon: "path_to_icon" },
    { type: "按钮", name: "组件1", icon: "el-icon-edit" },
    { type: "按钮", name: "组件2", icon: "SoldOut" },
    // ...其他按钮组件
  ],
  // ...其他分类和组件
};

const handleCategorySelect = (category: string) => {
  const categoryElement = document.getElementById(category);
  if (categoryElement) {
    categoryElement.scrollIntoView({ behavior: "smooth" });
  }
};
</script>

<style scoped>
.container {
  display: flex;
  height: 100%;
}

.component-list {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.component-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 80px;
  height: 80px;
  border: 1px solid #eee;
  padding: 10px;
  margin: 10px;
  justify-content: center;
  text-align: center;
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
@/op-kit
