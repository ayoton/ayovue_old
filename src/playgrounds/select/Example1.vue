<script lang="ts" setup>
import VueJsonPretty from "vue-json-pretty";
import "vue-json-pretty/lib/styles.css";
import { ref, reactive, computed, watch, nextTick, shallowRef } from "vue";
import ASelect from "../../components/ASelect/index.vue";
import AInput from "../../components/AInput/index.vue";
import { variants, sizes, inputTypes } from "../playgroundData";
import { generateBooleanCode, generateStringCode } from "../functions.js";
import AyoPrism from "../code/AyoPrism.vue";

// const options = ["Option1", "Option2", "Option3"];

const playgroundProps = reactive({
  selected: "",
  placeholder: "Enter your name",
  floatingLabel: "",
  variant: "primary",
  size: 16,
  clearable: false,
  isDisabled: false,
  showSearchField: false,
  autofocus: false
});

const selectComponent = ref(ASelect);

const options = ["Bangladesh", "India", "Pakistan", "Bhutan"];

const code = computed(() => {
  let codeString = `<ASelect
  :options="options"
  v-model="selected"
  size="${playgroundProps.size}"
  variant="${playgroundProps.variant}"
`;

  codeString += generateStringCode(`placeholder`, playgroundProps.placeholder);
  codeString += generateStringCode(
    `floatingLabel`,
    playgroundProps.floatingLabel
  );

  codeString += generateBooleanCode(`clearable`, playgroundProps.clearable);
  codeString += generateBooleanCode(`isDisabled`, playgroundProps.isDisabled);
  codeString += generateBooleanCode(
    `showSearchField`,
    playgroundProps.showSearchField
  );
  codeString += generateBooleanCode(`autofocus`, playgroundProps.autofocus);

  codeString += `>
</ASelect>
`;

  return codeString;
});

watch(
  () => playgroundProps.autofocus,
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
            v-model="playgroundProps.selected"
            :size="playgroundProps.size"
            :variant="playgroundProps.variant"
            :placeholder="playgroundProps.placeholder"
            :floatingLabel="playgroundProps.floatingLabel"
            :clearable="playgroundProps.clearable"
            :isDisabled="playgroundProps.isDisabled"
            :showSearchField="playgroundProps.showSearchField"
            :options="options"
            :autofocus="playgroundProps.autofocus"
            ref="selectComponent"
          >
          </ASelect>
          <div class="mt-3" style="font-size: 14px">
            v-model: {{ playgroundProps.selected }} <br />
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
                <div class="input-state">
                  <label class="mr-3 ai-center">
                    <input
                      type="checkbox"
                      v-model="playgroundProps.clearable"
                    />
                    <span class="ml-1"> clearable </span>
                  </label>
                </div>

                <div class="input-state">
                  <label class="mr-3 ai-center">
                    <input
                      type="checkbox"
                      v-model="playgroundProps.isDisabled"
                    />
                    <span class="ml-1"> isDisabled </span>
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

                <div class="input-state">
                  <label class="mr-3 ai-center">
                    <input
                      type="checkbox"
                      v-model="playgroundProps.autofocus"
                    />
                    <span class="ml-1"> autofocus </span>
                  </label>
                </div>
              </div>

              <label class="d-block mt-2">placeholder</label>
              <AInput v-model="playgroundProps.placeholder" :size="12">
              </AInput>

              <label class="d-block mt-1">floatingLabel</label>
              <AInput v-model="playgroundProps.floatingLabel" :size="12">
              </AInput>

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
