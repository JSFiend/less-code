<template>
  <div>
    <el-input
      v-model="projectName"
      class="text-gray-500 show-edit-input"
      size="small"
      @click="select"
      @change="change"
    >
    </el-input>
  </div>
</template>
  
<script setup lang='ts'>
import { storeToRefs } from 'pinia';
// import { useProjectStore } from '@/components/project/store';

// const projectStore = useProjectStore();
// const { projectName } = storeToRefs(projectStore);
const projectName = ref('');
let preProjectName = projectName.value;

function select(event: Event) {
  (event.target as HTMLInputElement).select();
}

function change(value: string) {
  if (!value) {
    projectName.value = preProjectName;
  } else {
    preProjectName = value;
  }
}
</script>

<style lang="scss">
.el-input--small.show-edit-input {
  .el-input__wrapper {
    @apply m-0 p-0 bg-black;
    box-shadow: none;
    .el-input__inner {
      @apply p-1;
      &:focus {
        @apply text-black bg-white;
      }
    }
  }
}
</style>
