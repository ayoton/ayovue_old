<script lang="ts" setup>
import { ref, reactive } from "vue";
import AInput from "../components/AInput/index.vue";
import { variants, sizes, inputTypes } from "./playgroundData";

const playgroundText = ref("");
const placeholder = ref("Enter your name");
const type = ref("");
const variant = ref("");
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
  <div class="main__container">
    <div class="main__output">
      <AInput
        v-model="playgroundText"
        :type="type"
        :size="size"
        :variant="variant"
        :placeholder="placeholder"
        :floatingLabel="''"
        :clearable="componentStates.clearable"
        :disabled="componentStates.disabled"
      >
      </AInput>
    </div>

    <div class="main__variations">
      <div class="row">
        <div class="col-md-6">
          <strong>Boolean Props</strong>
          <br />
          <div
            v-for="(value, cs) in componentStates"
            :key="cs"
            class="input-state"
          >
            <label class="mr-3 ai-center" :class="['label-' + cs]">
              <input type="checkbox" v-model="componentStates[cs]" />
              <span class="ml-1">
                {{ cs }}
              </span>
            </label>
          </div>

          <br />

          <strong>Other Props</strong>
          <br />
          <div class="ai-center">
            <label>Placeholder</label>
            <AInput v-model="placeholder" size="sm" class="ml-2"> </AInput>
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
            <label>Variant</label>

            <select class="ml-2" v-model="variant">
              <option v-for="v in variants" :key="v + ''">
                {{ v }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
