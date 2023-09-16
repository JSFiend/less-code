<template>
  <!-- 页面变量 -->
  <div class="flex flex-wrap">
    <el-card class="mr-4.5 mb-4.5 w-96" v-for="item in pageVariableList" :key="item.name">
      <template #header>
        <div class="card-header flex justify-between">
          <span>{{ item.name }}</span>
          <div>
            <el-button
              size="small"
              @click="openEditDataSource(item)"
              type="primary"
              :icon="Edit"
              circle
            />
            <el-button
              size="small"
              @click="copyDataSource(item)"
              type="warning"
              :icon="CopyDocument"
              circle
            />
            <el-button
              size="small"
              @click="deletePageVariable(item)"
              type="danger"
              :icon="Delete"
              circle
            />
          </div>
        </div>
      </template>
      <el-descriptions :column="1">
        <el-descriptions-item label-class-name="w-24 " label-align="right" label="描述">{{
          item.desc
        }}</el-descriptions-item>
        <el-descriptions-item
          label-class-name="w-24 "
          label-align="right"
          label="表达式"
          >{{ item.expression }}</el-descriptions-item
        >
        <el-descriptions-item
          label-class-name="w-24 "
          label-align="right"
          label="具体值"
          >{{ state[item.name] }}</el-descriptions-item
        >
      </el-descriptions>
    </el-card>
  </div>
  <!-- 页面变量 end -->
  <edit-page-variable></edit-page-variable>
</template>

<script setup lang="ts">
import { useDataSource } from "@/components/data-source/store";
import { Edit, CopyDocument, Delete } from "@element-plus/icons-vue";
import { PageVariable } from "~types/index";

const {
  pageVariableList,
  deletePageVariable,
  copyDataSource,
  state,
  editPageVariableVisible,
  currentEditPageVariable,
} = toRefs(useDataSource());


function openEditDataSource(pageVariable: PageVariable) {
  currentEditPageVariable.value = pageVariable;
  editPageVariableVisible.value = true;
}

</script>

<style scoped></style>
