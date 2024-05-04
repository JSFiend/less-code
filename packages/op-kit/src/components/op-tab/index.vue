<template>
  <el-tabs v-model="props.active" @tab-click="handleClick">
    <el-tab-pane v-for="(tab, index) in props.children" :label="tab.label" :name="index">
      <slot :name="'slot' + index"></slot>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
import { data, baseData, dataSchema } from "./config";
import { toDefinePropsFormat, parseExpression } from "op-kit/utils/index";
const name = baseData.componentName;
const propsDefine = toDefinePropsFormat(data);
export default { name };
</script>
<script setup lang="ts">
const props = defineProps(propsDefine);

console.log("propsprops", props);

const display = parseExpression(props.display);

function handleClick() {}
</script>

<style scoped></style>
