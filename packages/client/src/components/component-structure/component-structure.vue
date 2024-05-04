<template>
  <el-tree
    :allow-drop="allowDrop"
    :allow-drag="allowDrag"
    :data="instanceList"
    draggable
    default-expand-all
    @node-drag-start="handleDragStart"
    @node-drag-enter="handleDragEnter"
    @node-drag-leave="handleDragLeave"
    @node-drag-over="handleDragOver"
    @node-drag-end="handleDragEnd"
    @node-drop="handleDrop"
    :filter-node-method="filterNode"
    @filter="filterNode"
    node-key="data.uniqueId"
  >
    <template #default="{ node, data }">
      <div class="flex items-center">
        <div class="flex-1">{{ data?.baseData?.name || '插槽' }}</div>
      </div>
    </template>
  </el-tree>
</template>

<script lang="ts" setup>
import type Node from "element-plus/es/components/tree/src/model/node";
import type { DragEvents } from "element-plus/es/components/tree/src/model/useDragNode";
import type {
  AllowDropType,
  NodeDropType,
} from "element-plus/es/components/tree/src/tree.type";

import { useComponentInstanceStore } from "@/store/component-instance-store";
import { ComponentInstance } from "~types";

const componentInstanceStore = useComponentInstanceStore();

const { selectedInstance, instanceList } = toRefs(componentInstanceStore);

const treeProps = {
  label: "baseData.name",
  children: "children",
};

// 对树节点进行筛选时执行的方法， 返回 false 则表示这个节点会被隐藏
function filterNode(value: string, data: any) {
  console.log("filterNode", value, data);
  if (!value) return true;
  return data.name.includes(value);
}
const handleDragStart = (node: Node, ev: DragEvents) => {
  console.log("drag start", node);
};
const handleDragEnter = (draggingNode: Node, dropNode: Node, ev: DragEvents) => {
  console.log("tree drag enter:", dropNode.label);
};
const handleDragLeave = (draggingNode: Node, dropNode: Node, ev: DragEvents) => {
  console.log("tree drag leave:", dropNode.label);
};
const handleDragOver = (draggingNode: Node, dropNode: Node, ev: DragEvents) => {
  console.log("tree drag over:", dropNode.label);
};
const handleDragEnd = (
  draggingNode: Node,
  dropNode: Node,
  dropType: NodeDropType,
  ev: DragEvents
) => {
  console.log("tree drag end:", dropNode && dropNode.label, dropType);
};
const handleDrop = (
  draggingNode: Node,
  dropNode: Node,
  dropType: NodeDropType,
  ev: DragEvents
) => {
  console.log("tree drop:", dropNode.label, dropType);
};
const allowDrop = (draggingNode: Node, dropNode: Node, type: AllowDropType) => {
  if (dropNode.data.label === "Level two 3-1") {
    return type !== "inner";
  } else {
    return true;
  }
};
const allowDrag = (draggingNode: Node) => {
  return !draggingNode.data.label.includes("Level three 3-1-1");
};
</script>
