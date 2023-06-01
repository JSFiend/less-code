<template>
  <splitpanes class="text-gray-300 h-full w-full -mt-10 pt-10 px-2">
    <pane min-size="20">
      <splitpanes horizontal>
        <pane min-size="20" size="50" :style="topLeftStyle">
          <tabCard v-model="topLeftTakeUp">
            <template v-slot:header>
              <tabLink area="materialArea" areaComponent="components">组件</tabLink>
              <tabLink area="materialArea" areaComponent="components2">组件2</tabLink>
            </template>
            <router-view :name="$route.params['materialArea']"></router-view>
            <template v-slot:footer>
              <tabLink area="materialArea" areaComponent="components" v-if="$route.params['materialArea'] === 'components'">组件</tabLink>
            </template>
          </tabCard>
        </pane>
        <pane min-size="20" :style="bottomLeftStyle">
          <tabCard v-model="bottomLeftTakeUp">
            <template v-slot:header>
              <tabLink area="nodeTreeArea" areaComponent="page">页面</tabLink>
              <tabLink area="nodeTreeArea" areaComponent="componentStructure">组件结构</tabLink>
            </template>
            <router-view :name="$route.params['nodeTreeArea']"></router-view>
            <template v-slot:footer>
            </template>
          </tabCard>
        </pane>
      </splitpanes>
    </pane>
    <pane min-size="20" size="80">
      <splitpanes horizontal>
        <pane min-size="20" size="80" :style="topRightStyle">
          <tabCard v-model="topRightTakeUp">
            <template v-slot:header>
              <tabLink area="simulatorArea" areaComponent="simulator">模拟器</tabLink>
            </template>
            <router-view :name="$route.params['simulatorArea']"></router-view>
            <template v-slot:footer>
              <tagPageVue></tagPageVue>
            </template>
          </tabCard>
        </pane>
        <pane min-size="20" :style="bottomRightStyle">
          <tabCard v-model="bottomRightTakeUp">
            <template v-slot:header>
              <tabLink area="editArea" areaComponent="data" icon="DataLine">数据</tabLink>
              <tabLink area="editArea" areaComponent="operator">交互</tabLink>
              <tabLink area="editArea" areaComponent="style">样式</tabLink>
            </template>
            <router-view :name="$route.params['editArea']"></router-view>
            <template v-slot:footer>
            </template>
          </tabCard>
        </pane>
      </splitpanes>
    </pane>
  </splitpanes>
</template>
  
<script setup lang='ts'>
import { Pane, Splitpanes } from 'splitpanes';
import 'splitpanes/dist/splitpanes.css';
import { watch, ref } from 'vue';
// import { tabCard, tabLink } from '@/ui-lib';
// import tagPageVue from '@/components/page/tag-page.vue';

const topLeftTakeUp = ref(false);
const bottomLeftTakeUp = ref(false);
const topRightTakeUp = ref(false);
const bottomRightTakeUp = ref(false);


const tabHeaderHeight = '3.5rem';
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
watch(topRightTakeUp, (newValue) => {
  let style = {};
  if (newValue === true) {
    // 左下角放大，左上角要缩小
    topRightStyle.value = {
      height: `calc(100% - ${tabHeaderHeight})`,
    };
    bottomRightStyle.value = {
      height: tabHeaderHeight,
    };
    bottomRightTakeUp.value = false;
  } else {
    // 左边面板都没有放大
    topRightStyle.value = style;
    bottomRightStyle.value = style;
  }
});
watch(bottomRightTakeUp, (newValue) => {
  let style = {};
  if (newValue === true) {
    // 左下角放大，左上角要缩小
    bottomRightStyle.value = {
      height: `calc(100% - ${tabHeaderHeight})`,
    };
    topRightStyle.value = {
      height: tabHeaderHeight,
    };
    topRightTakeUp.value = false;
  } else {
    // 左边面板都没有放大
    topRightStyle.value = style;
    bottomRightStyle.value = style;
  }
});


</script>
  
<style lang="scss">
.splitpanes--vertical>.splitpanes__splitter {
  min-width: 6px;
}
.splitpanes--horizontal>.splitpanes__splitter {
    min-height: 6px;
}
</style>