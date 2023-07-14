<template>
  <div ref="editorContainer" id="editorContainer" style="width: 600px; height: 400px;"></div>
</template>

<script setup lang="ts">
import * as monaco from 'monaco-editor';

// 引入语言支持模块
// import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution';
// import 'monaco-editor/esm/vs/language/json/monaco.contribution';

// 引入主题
// import 'monaco-editor/esm/vs/editor/contrib/selectionClipboard/selectionClipboard';

const editorContainer = ref<HTMLDivElement | null>(null);

onMounted(() => {
  console.log('editorContainer', editorContainer);
  if (editorContainer.value) {
    monaco.editor.create(editorContainer.value, {
      value: '{}',
      theme: 'vs-dark',
      language: 'json',
      automaticLayout: true,
    });
  }
})

</script>