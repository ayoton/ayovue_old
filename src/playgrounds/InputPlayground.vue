<script lang="ts" setup>
import { ref, reactive } from "vue"
import AInput from "../components/AInput/index.vue"
import { variants, sizes, inputTypes } from "./playgroundData"

const playgroundText = ref("")
const placeholder = ref("Enter your name")
const floatingLabel = ref("")
const type = ref("text")
const variant = ref("primary")
const size = ref(16)
interface AT {
  [key: string]: boolean
}
const componentStates = reactive<AT>({
  clearable: false,
  disabled: false,
})

// function handleFocus() {
//   console.log("hohoho");
// }
</script>
<template>
  <div class="main__container">
    <div class="main__output pt-7" style="display: block">
      <AInput
        v-model="playgroundText"
        :type="type"
        :size="size"
        :variant="variant"
        :placeholder="placeholder"
        :floatingLabel="floatingLabel"
        :clearable="componentStates.clearable"
        :isDisabled="componentStates.disabled"
      >
      </AInput>

      <div class="mt-3" style="font-size: 14px">
        Value: {{ playgroundText }}
      </div>
    </div>

    <div class="main__variations">
      <div class="row">
        <div class="col-md-6">
          <strong>Boolean Props</strong>
          <br />
          <div v-for="(value, cs) in componentStates" :key="cs" class="input-state">
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

          <label>Placeholder</label> <br />
          <AInput v-model="placeholder" :size="12"> </AInput>

          <label class="d-block mt-2">Floating Label</label>
          <AInput v-model="floatingLabel" :size="12"> </AInput>

          <div class="mt-2">
            <label class="d-block">Type</label>

            <select v-model="type" class="w-100">
              <option></option>
              <option v-for="type in inputTypes" :key="type.type">
                {{ type.type }}
              </option>
            </select>
          </div>

          <div class="mt-2">
            <label class="d-block">Size</label>
            <AInput type="number" v-model="size" :size="12"> </AInput>
          </div>

          <div class="mt-2">
            <label class="d-block">Variant</label>

            <select v-model="variant" class="w-100">
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
