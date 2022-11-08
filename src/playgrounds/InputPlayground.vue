<script lang="ts" setup>
import { ref, reactive } from "vue";
import AInput from "../components/AInput/index.vue";
import {
  colors,
  sizes,
  buttonStates,
  inputTypes,
  inputStates
} from "./playgroundData";

const playgroundText = ref("");
const placeholder = ref("Enter your name");
const width = ref("");
const type = ref("");
const state = ref("");
const size = ref("");
interface AT {
  [key: string]: boolean;
}
const componentStates = reactive<AT>({
  clearable: false,
  disabled: false
});
</script>
<template>
  <div class="playground__container">
    <div class="playground__output">
      <AInput
        v-model="playgroundText"
        :type="type"
        :size="size"
        :state="state"
        :placeholder="placeholder"
        :floatingLabel="''"
        :clearable="componentStates.clearable"
        :disabled="componentStates.disabled"
        :width="width"
      >
      </AInput>
    </div>

    <div class="playground__variations">
      <div class="ai-center">
        <label>Placeholder</label>
        <AInput v-model="placeholder" size="sm" class="ml-2"> </AInput>
      </div>

      <div class="mt-3 ai-center">
        <label>Width</label>
        <AInput v-model="width" size="sm" class="ml-2" clearable> </AInput>
      </div>

      <div class="mt-2">
        <label>Type</label>

        <select class="ml-2" v-model="type">
          <option></option>
          <option v-for="type in inputTypes" :key="type.type">
            {{ type.type }}
          </option>
        </select>
      </div>

      <div class="mt-2">
        <label>Sizes</label>

        <select class="ml-2" v-model="size">
          <option></option>
          <option v-for="size in sizes" :key="size">
            {{ size }}
          </option>
        </select>
      </div>

      <div class="mt-2">
        <label>State</label>

        <select class="ml-2" v-model="state">
          <option v-for="s in inputStates" :key="s.value + ''">
            {{ s.value }}
          </option>
        </select>
      </div>

      <div v-for="(value, cs) in componentStates" :key="cs" class="input-state">
        <label class="mr-3 ai-center" :class="['label-' + cs]">
          <input type="checkbox" v-model="componentStates[cs]" />
          <span class="ml-1">
            {{ cs }}
          </span>
        </label>
      </div>
    </div>
  </div>
</template>

<style></style>
