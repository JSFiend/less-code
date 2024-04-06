<template>
  <div v-if="selectedInstance">
    <edit-schema v-model="selectedInstance.style" :schema="selectedInstance.styleSchema"></edit-schema>
    <box-model-editor></box-model-editor>
  </div>
</template>

<script setup lang="ts">
import { useComponentInstanceStore } from "@/store/component-instance-store";

const componentInstanceStore = useComponentInstanceStore();

const { selectedInstance } = toRefs(componentInstanceStore);

</script>

<style scoped></style>
