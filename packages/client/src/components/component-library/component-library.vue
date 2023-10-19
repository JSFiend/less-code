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
            <component-info :components-info="baseComponents" v-if="baseComponents.length" />
            <!-- <draggable
              item-key="componentInfo"
              v-model="baseComponents"
              class="flex flex-wrap"
              :group="{ name: 'component', pull: 'clone', put: false }"
              :sort="false"
              :clone="cloneComponent"
            >
              <div
                class="component-item"
                :key="metaData.name"
              >
                <el-icon :size="20" v-if="metaData.icon">
                  <img :src="metaData.icon" />
                </el-icon>
                <p>{{ metaData.name }}</p>
              </div>
            </draggable> -->
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
import draggable from 'vuedraggable';

console.log("libraryComponents", componentConfigs, opComponents);

const baseComponents = computed(() =>
  componentConfigs?.filter((config) => !config?.metaData?.isContainer)
);

function cloneComponent(...arg: any[]) {
  console.log(...arg)
}

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
