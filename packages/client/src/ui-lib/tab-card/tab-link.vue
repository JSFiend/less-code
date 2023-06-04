<template>
  <router-link
    class="tab-link"
    :to="to">
    <el-icon :size="20" v-if="props.icon">
      <component :is="props.icon"></component>
    </el-icon>
    <slot></slot>
  </router-link>
</template>

<script setup lang="ts">
import { Area } from '@/types';

interface TabLinkProps {
  area: Area,
  areaComponent: string,
  icon?: string,
}
const props = defineProps<TabLinkProps>();


const to = { name: 'main', params: { [props.area]: props.areaComponent } };
</script>

<style scoped lang="scss">
.tab-link {
  @apply flex flex-col justify-around items-center h-10 w-20 cursor-pointer;
}
</style>