<template>
  <div v-for="item in dataSource.list">
    {{ item.name }}
    {{ item.value }}
    {{ item.desc }}
  </div>
</template>

<script setup lang="ts">
import { useDataSource } from './store';

const dataSource = useDataSource();

</script>

<style scoped>

</style>