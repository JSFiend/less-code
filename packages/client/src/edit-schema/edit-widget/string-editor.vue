<template>
  <div>
    <el-form-item :label="schema.title">
      <el-input v-model="value[key]" />
      </el-form-item>
  </div>
</template>

<script setup lang="ts">
const value = defineModel<Record<string, string>>({ required: true });

const schema = defineModel<Schema>('schema', { required: true });
</script>

<style scoped>

</style>