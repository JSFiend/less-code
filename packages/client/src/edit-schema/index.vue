<template>
  <el-form :model="style" label-suffix="：" label-position="top">
    <el-form-item v-for="key in keys" :key="key" :label="styleSchema.properties?.[key].title">
      <!-- string type -->
      <el-input v-if="styleSchema.properties?.[key].type === 'string'" v-model="style[key]" />
      <!-- box type -->
      <box-model-editor v-if="styleSchema.properties?.[key].type === 'box'" v-model="style"></box-model-editor>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { Schema } from '~types/op-kit/component';
const style = defineModel<Record<string, string>>({ required: true });

const styleSchema = defineModel<Schema>('schema', { required: true });

const properties = computed(() => styleSchema.value.properties);

const keys = computed(() => Object.keys(styleSchema.value.properties));

</script>

<style scoped>

</style>