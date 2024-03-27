<template>
  <el-config-provider namespace="op">
    <div class="h-full w-full" v-if="route.name === 'preview'">
      <router-view></router-view>
    </div>
    <div class="h-full w-full" v-else>
      <router-view key="Header" name="Header"></router-view>
      <router-view key="layout" name="layout"></router-view>
    </div>
  </el-config-provider>
</template>

<script setup lang="ts">
const route = useRoute();
</script>
