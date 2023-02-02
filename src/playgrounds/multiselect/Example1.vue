<script lang="ts" setup>
import { ref, reactive, computed, watch } from "vue";
import AMultiSelect from "../../components/AMultiSelect/index.vue";
import { variants } from "../utils/playgroundData";
import { generateComponentCode } from "../utils/functions";
import AyoPrism from "../code/AyoPrism.vue";
import BooleanProps from "../components/BooleanProps.vue";
import StringProps from "../components/StringProps.vue";
import DropdownProps from "../components/DropdownProps.vue";
import VariableProps from "../components/VariableProps.vue";
import { stringContries as options } from "./data";

const componentData = reactive({
  name: "AMultiSelect",
  vModel: "Nepal",
  vModelRaw: "",
  booleanProps: {
    clearable: false,
    isDisabled: false,
    showSearchField: false,
    autofocus: false,
    loading: false
  },
  stringProps: {
    placeholder: "Select Country",
    floatingLabel: ""
  },

  numberProps: {
    size: "",
    scrollHeight: ""
  },
  dropdownProps: {
    variant: {
      vModel: "",
      options: variants
    }
  },
  variableProps: {
    options: options
  }
});

const selectComponent = ref(AMultiSelect);

const code = computed(() => {
  return generateComponentCode(componentData);
});

watch(
  () => componentData.booleanProps.autofocus,
  (newValue) => {
    // console.log(newValue);
    if (newValue) {
      selectComponent.value?.focus();
    }
  }
);
</script>
<template>
  <div>
    <div class="row gap-0 mt-4">
      <div class="col-1 col-md-5">
        <h2>Example 1 with string options</h2>
        <div class="playground__item mt-3">
          <AMultiSelect
            :options="componentData.variableProps.options"
            v-model="componentData.vModel"
            :size="componentData.numberProps.size"
            :variant="componentData.dropdownProps.variant.vModel"
            :placeholder="componentData.stringProps.placeholder"
            :floatingLabel="componentData.stringProps.floatingLabel"
            :clearable="componentData.booleanProps.clearable"
            :isDisabled="componentData.booleanProps.isDisabled"
            :showSearchField="componentData.booleanProps.showSearchField"
            :autofocus="componentData.booleanProps.autofocus"
            :scroll-height="componentData.numberProps.scrollHeight"
            :loading="componentData.booleanProps.loading"
            ref="selectComponent"
          >
          </AMultiSelect>
          <div class="mt-3" style="font-size: 14px">
            vModel: {{ componentData.vModel }} <br />
          </div>
          <AyoPrism :code="code" :fixed="true"></AyoPrism>
        </div>
      </div>

      <div class="col-1 col-md-7">
        <div class="row gap-7">
          <div class="col-md-6">
            <h4>Props</h4>
            <BooleanProps :items="componentData.booleanProps"></BooleanProps>
            <StringProps :items="componentData.stringProps"></StringProps>
            <StringProps
              :items="componentData.numberProps"
              type="number"
            ></StringProps>
            <DropdownProps :items="componentData.dropdownProps"></DropdownProps>
          </div>

          <div class="col-md-6">
            <VariableProps :items="componentData.variableProps"></VariableProps>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
