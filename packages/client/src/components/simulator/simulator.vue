<template>
  <div class="simulator" id="simulator">
    <draggable
      :list="instanceList"
      item-key="component"
      group="component"
      class="simulatorContent"
    >
      <template #item="{ element }">
        <component v-bind="element.data" :is="element.metaData.componentName"></component>
      </template>
    </draggable>
            <!-- <componentHandler :component-config="element">
          <component :is="element.info.componentName">
            <template v-if="element.info.componentType === ComponentType.Container">
              <simulatorContent :child-render-component="element.children" />
            </template>
          </component>
        </componentHandler> -->
  </div>
</template>

<script setup lang="ts">
import draggable from "vuedraggable";
import { useComponentInstanceStore } from '@/store/component-instance-store';

const componentInstanceStore = useComponentInstanceStore();

const { instanceList } = toRefs(componentInstanceStore);



</script>

<style scoped>
.simulator {
  padding: 20px;
}
</style>
