<script lang="ts" setup>
import VueJsonPretty from "vue-json-pretty";
import "vue-json-pretty/lib/styles.css";
import { ref, reactive, computed, watch, nextTick, shallowRef } from "vue";
import ASelect from "../../components/ASelect/index.vue";
import AInput from "../../components/AInput/index.vue";
import { variants, sizes, inputTypes } from "../playgroundData";
import { generatePropsCode } from "../functions.js";
import AyoPrism from "../code/AyoPrism.vue";

// const options = ["Option1", "Option2", "Option3"];

// const playgroundPropsOld = reactive({
//   selected: "",
//   placeholder: "Enter your name",
//   floatingLabel: "",
//   variant: "",
//   size: "",
//   clearable: false,
//   isDisabled: false,
//   showSearchField: false,
//   autofocus: false
// });

const playgroundProps = reactive({
  vModel: "",
  vModelRaw: "",
  booleans: {
    clearable: false,
    isDisabled: false,
    showSearchField: false,
    autofocus: false
  },
  strings: {
    placeholder: "Enter your name",
    floatingLabel: "",
    size: ""
  },
  dropdowns: {
    variant: {
      vModel: "",
      options: variants
    }
  }
});

const selectComponent = ref(ASelect);
const options = ["Bangladesh", "India", "Pakistan", "Bhutan"];

const code = computed(() => {
  let codeString = `<ASelect
  :options="options"
  v-model="selected"
`;

  codeString += generatePropsCode({
    ...playgroundProps.booleans,
    ...playgroundProps.strings
  });

  codeString += `>
</ASelect>
`;

  return codeString;
});

watch(
  () => playgroundProps.booleans.autofocus,
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
          <!-- <AInput placeholder="Username"> </AInput> <br /> -->

          <ASelect
            :options="options"
            v-model="playgroundProps.vModel"
            :size="playgroundProps.strings.size"
            :variant="playgroundProps.dropdowns.variant.vModel"
            :placeholder="playgroundProps.strings.placeholder"
            :floatingLabel="playgroundProps.strings.floatingLabel"
            :clearable="playgroundProps.booleans.clearable"
            :isDisabled="playgroundProps.booleans.isDisabled"
            :showSearchField="playgroundProps.booleans.showSearchField"
            :autofocus="playgroundProps.booleans.autofocus"
            ref="selectComponent"
          >
          </ASelect>
          <div class="mt-3" style="font-size: 14px">
            v-model: {{ playgroundProps.vModel }} <br />
          </div>

          <AyoPrism :code="code" :fixed="true"></AyoPrism>
        </div>
      </div>

      <div class="col-1 col-md-7">
        <div class="playground__item">
          <div class="row">
            <div class="col-md-6">
              <h4>Props</h4>
              <div class="d-flex fw-wrap">
                <div
                  class="input-state"
                  v-for="(value, key) in playgroundProps.booleans"
                >
                  <label class="mr-3 ai-center">
                    <input
                      type="checkbox"
                      v-model="playgroundProps.booleans[key]"
                    />
                    <span class="ml-1"> {{ key }} </span>
                  </label>
                </div>

                <!-- <div class="input-state">
                  <label class="mr-3 ai-center">
                    <input
                      type="checkbox"
                      v-model="playgroundPropsOld.isDisabled"
                    />
                    <span class="ml-1"> isDisabled </span>
                  </label>
                </div>

                <div class="input-state">
                  <label class="mr-3 ai-center">
                    <input
                      type="checkbox"
                      v-model="playgroundPropsOld.showSearchField"
                    />
                    <span class="ml-1"> show-search-field </span>
                  </label>
                </div>

                <div class="input-state">
                  <label class="mr-3 ai-center">
                    <input
                      type="checkbox"
                      v-model="playgroundPropsOld.autofocus"
                    />
                    <span class="ml-1"> autofocus </span>
                  </label>
                </div> -->
              </div>

              <label class="d-block mt-2">placeholder</label>
              <AInput v-model="playgroundProps.strings.placeholder" :size="12">
              </AInput>

              <label class="d-block mt-1">floatingLabel</label>
              <AInput
                v-model="playgroundProps.strings.floatingLabel"
                :size="12"
              >
              </AInput>

              <div class="mt-2">
                <label class="d-block">size</label>
                <AInput
                  type="number"
                  v-model="playgroundProps.strings.size"
                  :size="12"
                >
                </AInput>
              </div>

              <div class="mt-2">
                <label class="d-block">variant</label>

                <select
                  v-model="playgroundProps.dropdowns.variant.vModel"
                  class="w-100"
                >
                  <option
                    v-for="v in playgroundProps.dropdowns.variant.options"
                    :key="v + ''"
                  >
                    {{ v }}
                  </option>
                </select>
              </div>
            </div>

            <div class="col-md-6">
              <div class="mt-2">options:</div>
              <vue-json-pretty :data="options" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
