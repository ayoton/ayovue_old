<script lang="ts" setup>
import VueJsonPretty from "vue-json-pretty";
import "vue-json-pretty/lib/styles.css";
import { ref, reactive, computed, watch, nextTick, shallowRef } from "vue";
import ASelect from "../components/ASelect/index.vue";
import AInput from "../components/AInput/index.vue";
import { variants, sizes, inputTypes } from "./playgroundData";
import PlaygroundTab from "./PlaygroundTab.vue";
import AyoPrism from "./code/AyoPrism.vue";

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

const countries = [
  { name: "Bangladesh", value: "bn", flag: "https://flagcdn.com/16x12/bd.png" },
  { name: "India", value: "in", flag: "https://flagcdn.com/16x12/in.png" },
  { name: "China", value: "cn", flag: "https://flagcdn.com/16x12/cn.png" },
  { name: "USA", value: "us", flag: "https://flagcdn.com/16x12/us.png" },
  { name: "UK", value: "uk", flag: "https://flagcdn.com/16x12/gb-eng.png" },
  { name: "Russia", value: "ru", flag: "https://flagcdn.com/16x12/ru.png" },
  { name: "Srilanka", value: "sr", flag: "https://flagcdn.com/16x12/sr.png" }
];

const playgroundPropsList = ref({
  value: [
    {
      selected: "",
      placeholder: "Enter your name",
      floatingLabel: "",
      variant: "primary",
      size: 16,
      clearable: false,
      disabled: false,
      showSearchField: false
    },
    {
      selected: "",
      placeholder: "Select Country",
      floatingLabel: "",
      variant: "primary",
      size: 16,
      clearable: false,
      disabled: false,
      showSearchField: false,
      code: `<ASelect
  class="mb-2"
  :options="countries"
  v-model="selected"
  placeholder="Select Country"
  labelField="name"
>
  <template #selected>
    <div class="flex ai-center">
      <img :src="selected.flag" alt="" />
      <div class="ml-2">
        {{ selected.name }}
      </div>
    </div>
  </template>

  <template #option="{ option }">
    <div class="flex ai-center">
      <img :src="option.flag" alt="" />
      <div class="ml-2">
        {{ option.name }}
      </div>
    </div>
  </template>
</ASelect>`
    }
  ]
});

const example1Props = computed(() => {
  return playgroundPropsList.value.value[0];
});

const example2Props = computed(() => {
  return playgroundPropsList.value.value[1];
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
  example1Props.value.selected = "Example1";
}

const labelField = ref("name");

const tabItems = ["Example1", "Example2", "Example3"];
const selectedTab = ref("Example2");
</script>
<template>
  <div>
    <PlaygroundTab :items="tabItems" v-model="selectedTab"></PlaygroundTab>

    <div class="row gap-0 mt-4" v-if="selectedTab === 'Example1'">
      <div class="col-1 col-md-4">
        <div class="playground__item px-2">
          <!-- <AInput placeholder="Username"> </AInput> <br /> -->

          <ASelect
            v-model="example1Props.selected"
            :size="example1Props.size"
            :variant="example1Props.variant"
            :placeholder="example1Props.placeholder"
            :floatingLabel="example1Props.floatingLabel"
            :clearable="example1Props.clearable"
            :isDisabled="example1Props.disabled"
            :showSearchField="example1Props.showSearchField"
            :options="options"
            :labelField="labelField"
          >
          </ASelect>
          <div class="mt-3" style="font-size: 14px">
            Value: {{ example1Props.selected }}
          </div>

          <h4 class="mt-1">Props</h4>
          <div class="d-flex fw-wrap">
            <div class="input-state">
              <label class="mr-3 ai-center">
                <input type="checkbox" v-model="example1Props.clearable" />
                <span class="ml-1"> clearable </span>
              </label>
            </div>

            <div class="input-state">
              <label class="mr-3 ai-center">
                <input type="checkbox" v-model="example1Props.disabled" />
                <span class="ml-1"> disabled </span>
              </label>
            </div>

            <div class="input-state">
              <label class="mr-3 ai-center">
                <input
                  type="checkbox"
                  v-model="example1Props.showSearchField"
                />
                <span class="ml-1"> show-search-field </span>
              </label>
            </div>
          </div>

          <label class="d-block mt-2">placeholder</label>
          <AInput v-model="example1Props.placeholder" :size="12"> </AInput>

          <label class="d-block mt-1">floatingLabel</label>
          <AInput v-model="example1Props.floatingLabel" :size="12"> </AInput>

          <div class="mt-2">
            <label class="d-block">size</label>
            <AInput type="number" v-model="example1Props.size" :size="12">
            </AInput>
          </div>

          <div class="mt-2">
            <label class="d-block">variant</label>

            <select v-model="example1Props.variant" class="w-100">
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

    <div class="row gap-0 mt-4" v-if="selectedTab === 'Example2'">
      <div class="col-1 col-md-5">
        <div class="playground__item px-2">
          <!-- <AInput placeholder="Username"> </AInput> <br /> -->

          <!-- <ASelect
            v-model="example2Props.selected"
            :size="example2Props.size"
            :variant="example2Props.variant"
            :placeholder="example2Props.placeholder"
            :floatingLabel="example2Props.floatingLabel"
            :clearable="example2Props.clearable"
            :isDisabled="example2Props.disabled"
            :showSearchField="example2Props.showSearchField"
            :options="options"
            :labelField="labelField"
          >
          </ASelect> -->

          <ASelect
            class="mb-2"
            :options="countries"
            v-model="example2Props.selected"
            placeholder="Select Country"
            labelField="name"
          >
            <template #selected>
              <div class="flex ai-center">
                <img :src="example2Props.selected.flag" alt="" />
                <div class="ml-2">
                  {{ example2Props.selected.name }}
                </div>
              </div>
            </template>

            <template #option="{ option }">
              <div class="flex ai-center">
                <img :src="option.flag" alt="" />
                <div class="ml-2">
                  {{ option.name }}
                </div>
              </div>
            </template>
          </ASelect>

          <div class="mt-3" style="font-size: 14px">
            Value: {{ example2Props.selected }}
          </div>

          <h2 class="mt-2">Code</h2>

          <AyoPrism :code="example2Props.code" :fixed="true"></AyoPrism>
        </div>
      </div>

      <div class="col-1 col-md-7">
        <div class="playground__item">
          <h4 class="mt-1">Variables</h4>

          <h4>countries:</h4>
          <vue-json-pretty :data="countries" />
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
