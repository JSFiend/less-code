<template>
  <splitpanes class="h-full w-full -mt-10 pt-10 px-2">
    <!-- 左侧面板 -->
    <pane min-size="15">
      <splitpanes horizontal>
        <pane min-size="25" size="50" :style="topLeftStyle">
          <tabCard v-model="topLeftTakeUp">
            <template v-slot:header>
              <tabLink area="materialArea" areaComponent="componentLibrary">组件</tabLink>
              <tabLink area="materialArea" areaComponent="components2">组件2</tabLink>
            </template>
            <router-view
              :style="{ background: rightPanelBackgroundColor }"
              :name="($route.params['materialArea'] as string)"
            ></router-view>
            <template v-slot:footer>
              <tabLink
                area="materialArea"
                areaComponent="components"
                v-if="$route.params['materialArea'] === 'components'"
                >组件</tabLink
              >
            </template>
          </tabCard>
        </pane>
        <pane min-size="20" :style="bottomLeftStyle">
          <tabCard v-model="bottomLeftTakeUp">
            <template v-slot:header>
              <tabLink area="nodeTreeArea" areaComponent="pageConfig">页面配置</tabLink>
              <tabLink area="nodeTreeArea" areaComponent="componentStructure"
                >组件结构</tabLink
              >
            </template>
            <router-view
              :name="($route.params['nodeTreeArea'] as string)"
            ></router-view>
            <template v-slot:footer> </template>
          </tabCard>
        </pane>
      </splitpanes>
    </pane>
    <!-- 左侧面板 end -->
    <!-- 中间区域 -->
    <pane min-size="20" size="70">
      <splitpanes horizontal>
        <pane min-size="20" size="60" :style="topRightStyle">
          <tabCard>
            <template v-slot:header>
              <tabLink area="simulatorArea" areaComponent="simulator">模拟器</tabLink>
            </template>
            <router-view :name="($route.params['simulatorArea'] as string)"></router-view>
            <template v-slot:footer>
              <!-- <tagPageVue></tagPageVue> -->
            </template>
          </tabCard>
        </pane>
      </splitpanes>
    </pane>
    <!-- 中间区域 end -->
    <!-- 右侧面板 -->
    <pane min-size="15" :style="bottomRightStyle">
      <tabCard>
        <template v-slot:header>
          <tabLink area="editArea" areaComponent="editData">数据</tabLink>
          <tabLink area="editArea" areaComponent="editStyle">样式</tabLink>
          <tabLink area="editArea" areaComponent="editEvent">事件</tabLink>
        </template>
        <router-view
          :name="($route.params['editArea'] as string)"
        ></router-view>
        <template v-slot:footer> </template>
      </tabCard>
    </pane>
    <!-- 右侧面板 end -->
  </splitpanes>
</template>

<script setup lang="ts">
import { Pane, Splitpanes } from "splitpanes";
import "splitpanes/dist/splitpanes.css";
import { watch, ref } from "vue";
import { useDark } from "@vueuse/core";
const isDark = useDark();

// 编辑区域底色
const rightPanelBackgroundColor = computed(() =>
  isDark.value ? "transparent" : "white"
);

const topLeftTakeUp = ref(false);
const bottomLeftTakeUp = ref(false);
const tabHeaderHeight = "3.5rem";
let topLeftStyle = ref({});
let bottomLeftStyle = ref({});
let topRightStyle = ref({});
let bottomRightStyle = ref({});

// 一个面板放大或者缩小，它对应上下的面板都应该是打开的
watch(topLeftTakeUp, (newValue) => {
  let style = {};
  if (newValue === true) {
    // 左上角放大，左下角要缩小
    topLeftStyle.value = {
      height: `calc(100% - ${tabHeaderHeight})`,
    };
    bottomLeftStyle.value = {
      height: tabHeaderHeight,
    };
    bottomLeftTakeUp.value = false;
  } else {
    // 左边面板都没有放大
    topLeftStyle.value = style;
    bottomLeftStyle.value = style;
  }
});
watch(bottomLeftTakeUp, (newValue) => {
  let style = {};
  if (newValue === true) {
    // 左下角放大，左上角要缩小
    bottomLeftStyle.value = {
      height: `calc(100% - ${tabHeaderHeight})`,
    };
    topLeftStyle.value = {
      height: tabHeaderHeight,
    };
    topLeftTakeUp.value = false;
  } else {
    // 左边面板都没有放大
    topLeftStyle.value = style;
    bottomLeftStyle.value = style;
  }
});
</script>

<style lang="scss">
.splitpanes--vertical > .splitpanes__splitter {
  min-width: 6px;
}
.splitpanes--horizontal > .splitpanes__splitter {
  min-height: 6px;
}
</style>
