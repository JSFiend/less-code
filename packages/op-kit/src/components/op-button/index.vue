<template>
  <el-button v-if="display" :type="props.type" @click="click">{{ props.opText }}</el-button>
</template>


<script lang="ts">
import { data, baseData, dataSchema } from './config';
import { toDefinePropsFormat, parseExpression } from 'op-kit/utils/index';
import { emitEvent } from 'op-kit/action/event-handle';
const name = baseData.componentName;
const propsDefine = toDefinePropsFormat(data);
export default {  name }
</script>
<script setup lang="ts">

const props = defineProps(propsDefine);

const display = parseExpression(props.display);


function click() {
  emitEvent(props.uniqueId, 'click', {
    data: props,
  });
}

onMounted(() => {
  console.log('onMounted');
  emitEvent(props.uniqueId, 'init', {
    data: props,
  });
})

</script>

<style scoped>

</style>