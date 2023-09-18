<template>
  <div ref="editorContainer" class="w-full h-80 editorContainer"></div>
</template>

<script setup lang="ts">
import * as monaco from 'monaco-editor';
import { useDark } from "@vueuse/core";

const isDark = useDark();

const editorContainer = ref<HTMLDivElement | null>(null);

let editor: monaco.editor.IStandaloneCodeEditor;

watch(isDark, () => {
  monaco?.editor?.setTheme(isDark.value === true ? 'vs-dark' : 'vs');
});


interface Props {
  modelValue: string,
  language: string,
}
const props = defineProps<Props>();

interface Emits {
  (e: 'update:modelValue', value: string): void,
  (e: 'change', value: string): void,
}
const emits = defineEmits<Emits>();


watch(() => props.modelValue, () => {
  if (editor.setValue) {
    editor.setValue(props.modelValue);
  }
})

onMounted(() => {
  if (editorContainer.value) {
    editor = monaco.editor.create(editorContainer.value, {
      value: props.modelValue,
      theme: isDark.value === true ? 'vs-dark' : 'vs',
      language: props.language || 'json',
      // 自适应布局
      automaticLayout: true,
      // 不要滚动条的边框
      overviewRulerBorder: false,
      tabSize: 2,
      minimap: {
        // 不要小地图
        enabled: false, 
      },
    });
      // 监听值的变化
   editor.onDidChangeModelContent(() => {
    //给父组件实时返回最新文本
    const value = editor.getValue();
      emits('update:modelValue', value);
      emits('change', value);
    })
  }
})

</script>
<style lang="scss">
.monaco-editor {
  border: 1px solid var(--el-border-color);
  @apply overflow-auto;

  &:hover {
    border-color: var(--el-border-color-hover);
  }
  &.focused {
    border-color: var(--el-color-primary);
  }
}
</style>