<script lang="ts" setup>
import VueJsonPretty from "vue-json-pretty";
import "vue-json-pretty/lib/styles.css";
import { ref, reactive, computed, watch, nextTick, shallowRef } from "vue";
import ASelect from "../../components/ASelect/index.vue";
import AInput from "../../components/AInput/index.vue";
import { variants, sizes, inputTypes } from "../playgroundData";
import PlaygroundTab from "../PlaygroundTab.vue";
import Example1 from "./Example1.vue";
import AyoPrism from "../code/AyoPrism.vue";

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
const selectedTab = ref("Example1");
</script>
<template>
  <div>
    <PlaygroundTab :items="tabItems" v-model="selectedTab"></PlaygroundTab>

    <Example1 v-if="selectedTab === 'Example1'"></Example1>
  </div>
</template>

<style></style>
