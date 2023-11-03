<template>
  <div v-if="selectedInstance">
    <edit-schema v-model="selectedInstance.data" :schema="selectedInstance.dataSchema"></edit-schema>
  </div>
</template>

<script setup lang="ts">
import { useComponentInstanceStore } from "@/store/component-instance-store";

const componentInstanceStore = useComponentInstanceStore();

const { selectedInstance } = toRefs(componentInstanceStore);

</script>

<style scoped></style>
