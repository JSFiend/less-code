<template>
  <edit-schema v-model="pageConfig" :schema="pageConfigSchema"></edit-schema>
</template>

<script setup lang="ts">
import { usePageConfigStore } from "./page-config-store";

const pageConfigStore = usePageConfigStore();

const { pageConfig, pageConfigSchema } = toRefs(pageConfigStore);
</script>

<style scoped></style>
