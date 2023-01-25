<script lang="ts" setup>
import { ref, reactive, computed, watch } from "vue";
import ASelect from "../../components/ASelect/index.vue";
import { generateComponentCode } from "../utils/functions";
import AyoPrism from "../code/AyoPrism.vue";
import StringProps from "../components/StringProps.vue";
import DropdownProps from "../components/DropdownProps.vue";
import VariableProps from "../components/VariableProps.vue";
import { groupedCountries as options } from "./data";

const labelOptions = computed(() => {
  return Object.keys(options[0]);
});

const componentData = reactive({
  name: "ASelect",
  vModel: "",
  vModelRaw: "",

  stringProps: {
    placeholder: "Select Country"
  },

  dropdownProps: {
    labelField: {
      vModel: "name",
      options: labelOptions
    },
    valueField: {
      vModel: "value",
      options: labelOptions
    }
  },
  variableProps: {
    options: options
  }
});

const selectComponent = ref(ASelect);

const code = computed(() => {
  return `<ASelect
  v-model="vModel"
  :options="options"
  placeholder="Select Country"
  labelField="name"
  valueField="value"
  grouped
  groupedLabelField="continent"
  groupedOptionsField="countries"
>
</ASelect>
  `;
});
</script>
<template>
  <div>
    <div class="row gap-0 mt-4">
      <div class="col-1 col-md-5">
        <h2>Example 4 with grouped options</h2>
        <div class="playground__item mt-3">
          <ASelect
            :options="componentData.variableProps.options"
            :label-field="componentData.dropdownProps.labelField.vModel"
            :value-field="componentData.dropdownProps.valueField.vModel"
            v-model="componentData.vModel"
            :placeholder="componentData.stringProps.placeholder"
            ref="selectComponent"
            grouped
            groupedLabelField="continent"
            groupedOptionsField="countries"
          >
          </ASelect>
          <div class="mt-3" style="font-size: 14px">
            vModel: {{ componentData.vModel }} <br />
          </div>
          <VariableProps :items="componentData.variableProps"></VariableProps>
        </div>
      </div>

      <div class="col-1 col-md-7">
        <AyoPrism :code="code" :fixed="true"></AyoPrism>
      </div>
    </div>
  </div>
</template>

<style></style>
