<template>
  <div>
    <el-form-item :label="schema.title">
      <el-select v-model="value" placeholder="Select" size="large">
        <el-option
          v-for="(item, index) in schema.menu"
          :key="item"
          :label="shcema['enumNames'][index]"
          :value="item"
        />
      </el-select>
    </el-form-item>
  </div>
</template>

<script setup lang="ts">
const value = defineModel<string>({ required: true });

const schema = defineModel<Schema>("schema", { required: true });
</script>

<style scoped></style>
