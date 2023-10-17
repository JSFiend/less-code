<template>
  <div class="p2" v-if="selectedInstance">
    <VueForm v-model="selectedInstance.data" :schema="selectedInstance.dataSchema"> </VueForm>
  </div>
</template>

<script setup lang="ts">
import VueForm from "@lljj/vue3-form-element";
import { useComponentInstanceStore } from "@/store/component-instance-store";

const componentInstanceStore = useComponentInstanceStore();

const { selectedInstance } = toRefs(componentInstanceStore);
</script>

<style scoped></style>
