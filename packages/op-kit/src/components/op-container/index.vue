<template>
  <div>
    pre
    <slot><div class="text-center text-gray-500 h-10 border-dashed border-primary border leading-10">请放置组件</div></slot>
    next
  </div>
</template>


<script lang="ts">
import { data, metaData, dataSchema } from './config';
import { convertSchemaToProps, parseExpression } from 'op-kit/utils/index';
const name = metaData.componentName;
const propsDefine = convertSchemaToProps(dataSchema);
export default {  name }
</script>
<script setup lang="ts">

const props = defineProps(propsDefine);

const display = parseExpression(props.display);

</script>

<style scoped>

</style>