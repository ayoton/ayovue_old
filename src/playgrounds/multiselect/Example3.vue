<script lang="ts" setup>
import { ref, reactive, computed, watch } from "vue";
import ASelect from "../../components/ASelect/index.vue";
import AyoPrism from "../code/AyoPrism.vue";
import VariableProps from "../components/VariableProps.vue";
import { objectCountries as options } from "./data";

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
>
  <template #selected="{ selectedOption }">
    <div class="d-flex ai-center" v-if="selectedOption">
      <img :src="selectedOption.flag" alt="" />
      <div class="ml-2">{{ selectedOption.name }}</div>
    </div>
  </template>

  <template #option="{ option }">
    <div class="d-flex ai-center">
      <img :src="option.flag" alt="" />
      <div class="ml-2">{{ option.name }}</div>
    </div>
  </template>
</ASelect>
  `;
});
</script>
<template>
  <div>
    <div class="row gap-0 mt-4">
      <div class="col-1 col-md-5">
        <h2>Example 3 with slots</h2>
        <div class="playground__item mt-3">
          <ASelect
            :options="componentData.variableProps.options"
            :label-field="componentData.dropdownProps.labelField.vModel"
            :value-field="componentData.dropdownProps.valueField.vModel"
            v-model="componentData.vModel"
            v-model:raw="componentData.vModelRaw"
            :placeholder="componentData.stringProps.placeholder"
            ref="selectComponent"
          >
            <template #option="{ option }">
              <div class="d-flex ai-center">
                <img :src="option.flag" alt="" />
                <div class="ml-2">{{ option.name }}</div>
              </div>
            </template>

            <template #selected="{ selectedOption }">
              <div class="d-flex ai-center" v-if="selectedOption">
                <img :src="selectedOption.flag" alt="" />
                <div class="ml-2">{{ selectedOption.name }}</div>
              </div>
            </template>
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
