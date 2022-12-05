<script lang="ts" setup>
import { ref, reactive } from "vue";
import ASelect from "../components/ASelect/index.vue";
import AInput from "../components/AInput/index.vue";
import { variants, sizes, inputTypes } from "./playgroundData";

const selected = ref("");
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

const options = ["Option1", "Option2", "Option3"];
const arrayOfString = ["Bangladesh", "India", "Pakistan", "Bhutan"];
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
  disabled: false
});
</script>
<template>
  <div class="row">
    <div class="col-1 col-md-4">
      <div class="playground__item">
        <!-- <AInput placeholder="Username"> </AInput> <br /> -->

        <ASelect
          v-model="playgroundProps.selected"
          :size="playgroundProps.size"
          :variant="playgroundProps.variant"
          :placeholder="playgroundProps.placeholder"
          :floatingLabel="playgroundProps.floatingLabel"
          :clearable="playgroundProps.clearable"
          :isDisabled="playgroundProps.disabled"
          :options="options"
        >
        </ASelect>
        <div class="mt-3" style="font-size: 14px">
          Value: {{ playgroundProps.selected }}
        </div>

        <strong>Boolean Props</strong>
        <br />
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

        <br />

        <strong>Other Props</strong>
        <br />

        <label>Placeholder</label> <br />
        <AInput v-model="playgroundProps.placeholder" :size="12"> </AInput>

        <label class="d-block mt-2">Floating Label</label>
        <AInput v-model="playgroundProps.floatingLabel" :size="12"> </AInput>

        <div class="mt-2">
          <label class="d-block">Size</label>
          <AInput type="number" v-model="playgroundProps.size" :size="12">
          </AInput>
        </div>

        <div class="mt-2">
          <label class="d-block">Variant</label>

          <select v-model="playgroundProps.variant" class="w-100">
            <option v-for="v in variants" :key="v + ''">
              {{ v }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <div class="col-1 col-md-8">
      <div class="playground__item">
        <h2>Variables</h2>
        <div class="mt-2">
          <strong>arrayOfString:</strong>

          {{ arrayOfString }}
        </div>

        <div class="mt-2">
          <strong>arrayOfObjects:</strong>

          {{ arrayOfObjects }}
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
