<script lang="ts" setup>
import VueJsonPretty from "vue-json-pretty";
import "vue-json-pretty/lib/styles.css";

import { ref, reactive, computed, watch, nextTick, shallowRef } from "vue";
import ASelect from "../components/ASelect/index.vue";
import AInput from "../components/AInput/index.vue";
import { variants, sizes, inputTypes } from "./playgroundData";

const placeholder = ref("Enter your name");
const floatingLabel = ref("");
const variant = ref("primary");
const size = ref(16);
interface AT {
  [key: string]: boolean;
}
const componentStates = reactive<AT>({
  clearable: false,
  disabled: false
});

// const options = ["Option1", "Option2", "Option3"];

const arrayOfStrings = ["Bangladesh", "India", "Pakistan", "Bhutan"];
const arrayOfObjects = [
  { name: "Bangladesh", language: "Bangla", code: "+880" },
  { name: "India", language: "Hindi", code: "+91" },
  { name: "Pakistan", language: "Urdu", code: "+92" },
  { name: "Srilanka", language: "Tamil", code: "+94" }
];

const playgroundProps = reactive({
  selected: "",
  placeholder: "Enter your name",
  floatingLabel: "",
  variant: "primary",
  size: 16,
  clearable: false,
  disabled: false,
  showSearchField: false
});

const optionsList: any = {
  arrayOfStrings: ["Bangladesh", "India", "Pakistan", "Bhutan"],
  arrayOfObjects: [
    { name: "Bangladesh", language: "Bangla", code: "+880" },
    { name: "India", language: "Hindi", code: "+91" },
    { name: "Pakistan", language: "Urdu", code: "+92" },
    { name: "Srilanka", language: "Tamil", code: "+94" }
  ]
};

const optionVariableNames = ["arrayOfStrings", "arrayOfObjects"];

const optionVariableName = ref("arrayOfStrings");

const computedOptionVariableName = computed({
  get() {
    return optionVariableName.value;
  },
  set(v) {
    optionVariableName.value = v;
    resetModelValue();
  }
});

const options = computed(() => {
  return optionsList[optionVariableName.value];
});

const labelFields = computed(() => {
  if (
    !options.value ||
    options.value.length === 0 ||
    typeof options.value[0] !== "object"
  ) {
    return [];
  }

  return Object.keys(options.value[0]);
});

function resetModelValue() {
  playgroundProps.selected = "";
}

const labelField = ref("name");
</script>
<template>
  <div class="row gap-0">
    <div class="col-1 col-md-4">
      <div class="playground__item px-2">
        <!-- <AInput placeholder="Username"> </AInput> <br /> -->

        <ASelect
          v-model="playgroundProps.selected"
          :size="playgroundProps.size"
          :variant="playgroundProps.variant"
          :placeholder="playgroundProps.placeholder"
          :floatingLabel="playgroundProps.floatingLabel"
          :clearable="playgroundProps.clearable"
          :isDisabled="playgroundProps.disabled"
          :showSearchField="playgroundProps.showSearchField"
          :options="options"
          :labelField="labelField"
        >
        </ASelect>
        <div class="mt-3" style="font-size: 14px">
          Value: {{ playgroundProps.selected }}
        </div>

        <h4 class="mt-1">Props</h4>
        <div class="d-flex fw-wrap">
          <div class="input-state">
            <label class="mr-3 ai-center">
              <input type="checkbox" v-model="playgroundProps.clearable" />
              <span class="ml-1"> clearable </span>
            </label>
          </div>

          <div class="input-state">
            <label class="mr-3 ai-center">
              <input type="checkbox" v-model="playgroundProps.disabled" />
              <span class="ml-1"> disabled </span>
            </label>
          </div>

          <div class="input-state">
            <label class="mr-3 ai-center">
              <input
                type="checkbox"
                v-model="playgroundProps.showSearchField"
              />
              <span class="ml-1"> show-search-field </span>
            </label>
          </div>
        </div>

        <label class="d-block mt-2">placeholder</label>
        <AInput v-model="playgroundProps.placeholder" :size="12"> </AInput>

        <label class="d-block mt-1">floatingLabel</label>
        <AInput v-model="playgroundProps.floatingLabel" :size="12"> </AInput>

        <div class="mt-2">
          <label class="d-block">size</label>
          <AInput type="number" v-model="playgroundProps.size" :size="12">
          </AInput>
        </div>

        <div class="mt-2">
          <label class="d-block">variant</label>

          <select v-model="playgroundProps.variant" class="w-100">
            <option v-for="v in variants" :key="v + ''">
              {{ v }}
            </option>
          </select>
        </div>

        <div class="mt-2">
          <label class="d-block">options</label>

          <select v-model="computedOptionVariableName" class="w-100">
            <option v-for="ovn in optionVariableNames" :key="ovn">
              {{ ovn }}
            </option>
          </select>
        </div>

        <div class="mt-2" v-if="labelFields.length > 0">
          <label class="d-block">labelField</label>

          <select v-model="labelField" class="w-100">
            <option v-for="lf in labelFields" :key="lf">
              {{ lf }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <div class="col-1 col-md-8">
      <div class="playground__item">
        <h2>Variables</h2>

        <div class="row">
          <div class="col-md-6 mt-2">
            <strong>arrayOfObjects:</strong>
            <vue-json-pretty :data="arrayOfObjects" />
          </div>
          <div class="col-md-6 mt-2">
            <strong>arrayOfStrings:</strong>
            <vue-json-pretty :data="arrayOfStrings" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
