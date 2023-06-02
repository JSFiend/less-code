<template>
  <div
    class="flex flex-col justify-around items-center h-14 w-20 cursor-pointer"
    :class="{
      'tab-card-active': false,
    }"
    @click="('components')"
  >  
    <el-icon :size="20">
      <component is="TakeawayBox"></component>
    </el-icon>
    <span>组件</span>
  </div>
</template>

<script setup lang="ts">

interface LcButton {
  label: string,
  icon?: string,
}
const props = defineProps<LcButton>();

</script>

<style scoped>

</style>