<template>
  <div class="p2">
    <VueForm v-model="formData" :schema="schema"> </VueForm>
  </div>
</template>

<script setup lang="ts">
import VueForm from "@lljj/vue3-form-element";
import { useDark, useToggle } from "@vueuse/core";

const isDark = useDark();

const formData = reactive<any>({});
const schemaJson = {
  title: "Widgets",
  type: "object",
  properties: {
    stringFormats: {
      type: "object",
      title: "String formats",
      required: ["email", "uri"],
      properties: {
        email: {
          title: "Email",
          type: "string",
          format: "email",
        },
        uri: {
          title: "Uri",
          type: "string",
          format: "uri",
        },
      },
    },
    boolean: {
      type: "object",
      title: "Boolean field",
      properties: {
        default: {
          type: "boolean",
          title: "checkbox (default)",
          description: "This is the checkbox-description",
        },
        radio: {
          type: "boolean",
          title: "radio buttons",
          description: "This is the radio-description",
        },
        select: {
          type: "boolean",
          title: "select box",
          description: "This is the select-description",
        },
      },
    },
    string: {
      type: "object",
      title: "String field",
      properties: {
        default: {
          type: "string",
          title: "text input (default)",
        },
        textarea: {
          type: "string",
          title: "textarea",
        },
        color: {
          type: "string",
          title: "color picker",
          format: "color",
          default: "#151ce6",
        },
      },
    },
    secret: {
      type: "string",
      default: "I'm a hidden string.",
    },
    disabled: {
      type: "string",
      title: "A disabled field",
      default: "I am disabled.",
    },
    readonly: {
      type: "string",
      title: "A readonly field",
      default: "I am read-only.",
    },
    widgetOptions: {
      title: "Custom widget with options",
      type: "string",
      default: "I am yellow",
    },
    selectWidgetOptions: {
      title: "Custom select widget with options",
      type: "string",
      enum: ["foo", "bar"],
      enumNames: ["Foo", "Bar"],
    },
  },
};
const schema = ref(schemaJson);
</script>

<style scoped></style>
