<template>
  <div class="w-full h-full bg-body relative flex flex-col rounded-2xl">
    <!-- header -->
    <div class="tab-card-header">
      <div class="flex-grow flex">
        <slot name="header"></slot>
      </div>
      <el-icon v-if="open != undefined" :size="20" @click="open = !open" class="cursor-pointer" :class="{ 'text-primary': open}">
        <component :is="open ? 'Minus' : 'Plus'"/>
      </el-icon>
    </div>
      <!-- body -->
      <div class="flex-1 overflow-auto">
        <slot></slot>
      </div>
      <!-- footer -->
      <div v-show="footerDisplay" class="tab-card-footer">
        <slot name="footer" :show-footer="showFooter">
          {{ showFooter(false) }}
        </slot>
      </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue';

const emit = defineEmits<{
  (e: 'update:modelValue', open: boolean): void,
}>();
const props = defineProps(['modelValue']);


const open = computed<boolean>({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  }
});

// 是否要显示面板脚部, 如果没有 footer slot 就会不显示
const footerDisplay = ref(true);
function showFooter(show: boolean) {
	footerDisplay.value = show;
}
</script>
<style lang="scss">
.tab-card-header {
  @apply box-content h-14 px-2 bg-title border-black rounded-t-2xl flex place-items-center;
  border-bottom-width: 1.5px;
}
.tab-card-footer {
  @apply box-content h-12 px-6 bg-footer rounded-b-2xl flex place-items-center border-black border-t;
}
</style>
