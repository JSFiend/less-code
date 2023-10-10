<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="key" label="属性名"></el-table-column>
    <el-table-column label="值">
    <template #default="scope">
      <div v-if="isExpandable(scope.row)" style="cursor: pointer" @click="toggleExpand(scope.row)">
        <span v-if="scope.row.expanded">▼</span>
        <span v-else>▶</span>
        {{ scope.row.value }}
      </div>
      <el-input 
        v-else 
        v-model="scope.row.value" 
        @input="updateOriginalJson(scope.row.key, scope.row.value)"
      ></el-input>
    </template>
  </el-table-column>
    <el-table-column prop="type" label="类型"></el-table-column>
    <el-table-column label="操作">
      <template #default="scope">
        <el-button size="mini" @click="handleDelete(scope.$index)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { defineProps } from 'vue';

type JSONDataProps = {
  jsonData: Record<string, any>;
};

const props = defineProps<JSONDataProps>();

interface TableEntry {
  key: string;
  value: any;
  type: string;
  expanded?: boolean;
  children?: TableEntry[];
}

const tableData = ref<TableEntry[]>([]);

const isExpandable = (row: TableEntry) => ['object', 'array'].includes(row.type);

const toggleExpand = (row: TableEntry) => {
  if (row.expanded) {
    const index = tableData.value.indexOf(row);
    const count = row.children!.length;
    tableData.value.splice(index + 1, count);
  } else {
    const index = tableData.value.indexOf(row);
    tableData.value.splice(index + 1, 0, ...row.children!);
  }
  row.expanded = !row.expanded;
};

const flattenData = (obj: any, prefix = '') => {
  const entries: TableEntry[] = [];

  if (Array.isArray(obj)) {
    obj.forEach((value, index) => {
      const fullKey = `${prefix}[${index}]`;
      if (typeof value === 'object' && value !== null) {
        const children = flattenData(value, fullKey);
        entries.push({ key: fullKey, value: '[Array]', type: 'array', children: children, expanded: false });
      } else {
        entries.push({ key: fullKey, value: value, type: typeof value });
      }
    });
  } else {
    Object.entries(obj).forEach(([key, value]) => {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      if (typeof value === 'object' && value !== null) {
        const children = flattenData(value, fullKey);
        entries.push({ key: fullKey, value: '[Object]', type: 'object', children: children, expanded: false });
      } else {
        entries.push({ key: fullKey, value: value, type: typeof value });
      }
    });
  }
  return entries;
};

tableData.value = flattenData(props.jsonData);

const handleDelete = (index: number) => {
  const row = tableData.value[index];
  if (row.children) {
    const count = row.children.length;
    tableData.value.splice(index, count + 1);
  } else {
    tableData.value.splice(index, 1);
  }
};

const updateOriginalJson = (path: string, value: any, obj: any = props.jsonData) => {
  const keys = path.split('.');
  let key = keys.shift();

  // 检查是否是数组的键，如 b[0]
  const match = key?.match(/(\w+)\[(\d+)\]/);
  if (match) {
    key = match[1];
    const index = match[2];
    if (keys.length === 0) {
      obj[key][index] = value;
    } else {
      updateOriginalJson(keys.join('.'), value, obj[key][index]);
    }
  } else {
    if (keys.length === 0) {
      obj[key!] = value;
    } else {
      updateOriginalJson(keys.join('.'), value, obj[key!]);
    }
  }
};

// 现在，每当有输入更改时，我们只需调用 updateOriginalJson

</script>
