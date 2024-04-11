<template>
  <div v-if="selectedInstance" class="overflow-auto h-full">
    <!-- <edit-schema v-model="selectedInstance.style" :schema="selectedInstance.styleSchema"></edit-schema>
    <box-model-editor></box-model-editor> -->
    <edit-schema v-model="selectedInstance.style" :schema="selectedInstance.styleSchema"></edit-schema>
  </div>
</template>

<script setup lang="ts">
import { useComponentInstanceStore } from "@/store/component-instance-store";

import EditSchema from '@/edit-schema/index.vue';

const componentInstanceStore = useComponentInstanceStore();

const { selectedInstance } = toRefs(componentInstanceStore);

</script>

<style scoped></style>
