<template>
  <div :id="uniqueId">
    <template v-for="(child, index) in slotChildren">
      <slot :name="'slot' + index"></slot>
    </template>
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

const { slotChildren, uniqueId } = toRefs(props);

const display = parseExpression(props.display);
</script>

<style scoped></style>
