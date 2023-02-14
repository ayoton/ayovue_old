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

const showDialog = ref(false);
const anotherModal = ref(false);

const componentData = reactive({
  name: "ADialog",
  vModel: false,
  vModelRaw: "",
  booleanProps: {
    closeOnOutsideClick: false,
    hideHeader: false
  },
  stringProps: {
    width: "",
    title: "Modal Heading"
  },

  numberProps: {},
  dropdownProps: {},
  variableProps: {}
});

const code = computed(() => {
  return generateComponentCode(componentData);
});

function generateToast() {
  showToast({
    type: "success",
    detail: "Done successfully",
    summary: "Success",
    duration: 2222
  });
}
</script>

<template>
  <div>
    <div class="row gap-0 mt-4">
      <div class="col-md-4">
        <h2>Default toast</h2>
        <div class="playground__item mt-3">
          <AButton @click="generateToast">Show Toast</AButton>

          <h4 class="mt-4">Props</h4>
          <BooleanProps :items="componentData.booleanProps"></BooleanProps>
          <StringProps :items="componentData.stringProps"></StringProps>
          <StringProps
            :items="componentData.numberProps"
            type="number"
          ></StringProps>
          <DropdownProps :items="componentData.dropdownProps"></DropdownProps>
        </div>
      </div>

      <div class="col-md-8">
        <AyoPrism :code="code" :fixed="true"></AyoPrism>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
