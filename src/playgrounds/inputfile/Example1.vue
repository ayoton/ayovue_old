<script lang="ts" setup>
import { ref, reactive, computed } from "vue";
import { generateComponentCode } from "../utils/functions";
import AButton from "../../components/AButton/index.vue";
import AInputFile from "../../components/AInputFile/index.vue";
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
  return `<AInputFile></AInputFile>`;
});
</script>

<template>
  <div>
    <div class="row gap-0 mt-4">
      <div class="col-md-6">
        <h2>Default</h2>
        <div class="playground__item mt-3">
          <AInputFile aspect-ratio="5/3" width="300px"></AInputFile>
        </div>
      </div>

      <div class="col-md-6">
        <AyoPrism :code="code" :fixed="true"></AyoPrism>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
