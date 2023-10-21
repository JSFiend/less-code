<template>
  <el-button v-if="display" :type="props.type">{{ props.opText }}</el-button>
</template>


<script lang="ts">
import { data, metaData, dataSchema } from './config';
import { toDefinePropsFormat, parseExpression } from 'op-kit/utils/index';
const name = metaData.componentName;
const propsDefine = toDefinePropsFormat(data);
export default {  name }
</script>
<script setup lang="ts">

const props = defineProps(propsDefine);

const display = parseExpression(props.display);

</script>

<style scoped>

</style>