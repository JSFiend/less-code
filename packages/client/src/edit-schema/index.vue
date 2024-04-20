<template>
  <el-form :model="value" label-suffix="：" label-position="top">
    <template v-for="key in keys" :key="key">
      <!-- string type -->
      <string-editor
        v-if="schema.properties?.[key].type === 'string'"
        v-model="value[key]"
        v-model:schema="schema.properties[key]"
      ></string-editor>
      <!-- box type -->
      <box-model-editor
        v-if="schema.properties?.[key].type === 'box'"
        v-model="value"
        v-model:schema="schema.properties[key]"
      ></box-model-editor>
    </template>
  </el-form>
</template>

<script setup lang="ts">
import { Schema } from "~types/op-kit/component";
const value = defineModel<Record<string, string>>({ required: true });

const schema = defineModel<Schema>("schema", { required: true });

const properties = computed(() => schema.value.properties);

const keys = computed(() => Object.keys(schema.value.properties));
</script>

<style scoped></style>
