<template>
  <el-button v-if="display" :type="props.type">{{ props.opText }}</el-button>
</template>


<script lang="ts">
import { data, metaData, dataSchema } from './config';
import { convertSchemaToProps, parseExpression } from 'op-kit/utils/index';
const name = metaData.componentName;
const propsDefine = convertSchemaToProps(dataSchema);
export {  name, propsDefine }
</script>
<script setup lang="ts">

const props = defineProps(propsDefine);

const display = parseExpression(props.display);

console.log('props', display, props, props.opText, data);
</script>

<style scoped>

</style>