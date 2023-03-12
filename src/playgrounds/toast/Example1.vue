<script lang="ts" setup>
import { ref, reactive, computed } from "vue";
import { generateComponentCode } from "../utils/functions";
import AButton from "../../components/AButton/index.vue";
import ADialog from "../../components/ADialog/index.vue";
import AyoPrism from "../code/AyoPrism.vue";
import BooleanProps from "../components/BooleanProps.vue";
import StringProps from "../components/StringProps.vue";
import DropdownProps from "../components/DropdownProps.vue";
import VariableProps from "../components/VariableProps.vue";

import { useToast } from "../../components/composables/useToasts";

const { showToast } = useToast();

// const componentData = reactive({
//   name: "ADialog",
//   vModel: false,
//   vModelRaw: "",
//   booleanProps: {
//     closeOnOutsideClick: false,
//     hideHeader: false
//   },
//   stringProps: {
//     width: "",
//     title: "Modal Heading"
//   },

//   numberProps: {},
//   dropdownProps: {},
//   variableProps: {}
// });

const code = computed(() => {
  // return generateComponentCode(componentData);
  return `function showInfoToast() {
  showToast({
    type: "info",
    detail: "Account will be verified soon",
    summary: "Information",
    duration: 3333,
    group: "br"
  });
}`;
});

function generateToast(group?: string) {
  showToast({
    type: "success",
    detail: "Done successfully",
    summary: "Success",
    duration: 44444,
    group
  });
}

function showSuccessToast() {
  showToast({
    type: "success",
    detail: "Done successfully",
    summary: "Success",
    duration: 3333
  });
}

function showDangerToast() {
  showToast({
    type: "danger",
    detail: "Something went wrong!",
    summary: "Error",
    duration: 3333,
    group: "tl"
  });
}

function showWarningToast() {
  showToast({
    type: "warning",
    detail: "This might cause error!",
    summary: "Warning",
    duration: 3333,
    group: "tc"
  });
}

function showInfoToast() {
  showToast({
    type: "info",
    detail: "Account will be verified soon",
    summary: "Information",
    duration: 3333,
    group: "br"
  });
}
</script>

<template>
  <div>
    <div class="row gap-0 mt-4">
      <div class="col-md-4">
        <h2>Default toast</h2>
        <div class="playground__item mt-3">
          <AButton @click="showSuccessToast()">Success Toast</AButton> <br />
          <AButton @click="showDangerToast" class="mt-2" variant="danger">
            Top Left Danger
          </AButton>
          <br />
          <AButton @click="showWarningToast" class="mt-2" variant="warning">
            Top Center Warning
          </AButton>
          <br />
          <AButton @click="showInfoToast" class="mt-2" variant="info">
            Bottom Right Info
          </AButton>
          <br />
          <AButton @click="generateToast('bl')" class="mt-2">
            Bottom Left Success
          </AButton>
          <br />
          <AButton @click="generateToast('bc')" class="mt-2">
            Bottom Center Success
          </AButton>

          <AButton @click="generateToast('tr')" class="mt-2">
            Top Right Custom Slot
          </AButton>
        </div>
      </div>

      <div class="col-md-8">
        <AyoPrism :code="code" :fixed="true"></AyoPrism>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
