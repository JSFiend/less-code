<template>
  <div>
    开始
    <template v-for="(child, index) in children">
      开始 slot
      <slot :name="'slot' + index"></slot>
      结束 slot
    </template>
    <slot>默认</slot>
    结束
  </div>
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

const { children } = toRefs(props);

const display = parseExpression(props.display);
</script>

<style scoped></style>
