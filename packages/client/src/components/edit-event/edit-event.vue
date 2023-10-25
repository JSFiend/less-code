<template>
  <div class="flex justify-center p10">
    <el-button type="primary" @click="eventPanelVisible = true">事件编排</el-button>
  </div>
  <event-panel />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useEventStore } from '@/components/edit-event/edit-event-store';

const eventStore = useEventStore();

const { eventPanelVisible } = toRefs(eventStore);

</script>
