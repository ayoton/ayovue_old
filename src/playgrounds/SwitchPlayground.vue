<script lang="ts" setup>
import { ref } from "vue"
import ASwitch from "../components/ASwitch/index.vue"
import AInput from "../components/AInput/index.vue"
import { variants, sizes, buttonStates } from "./playgroundData"
const variant = ref("")
const value = ref(true)
const size = ref(16)
</script>
<template>
  <div class="main__container">
    <div class="main__output">
      <ASwitch offText="Abdullah" onText="on" v-model="value" :size="size"
        >Click me</ASwitch
      >
    </div>

    <div class="main__variations">
      <div class="row">
        <div class="col-md-6">
          <strong>Boolean Props</strong>
          <div v-for="(value, buttonState) in buttonStates" :key="buttonState">
            <label>
              <input type="checkbox" v-model="buttonStates[buttonState]" />
              <span class="ml-2">
                {{ buttonState }}
              </span>
            </label>
          </div>
        </div>

        <div class="col-md-6">
          <strong> Other Props </strong> <br />
          <label for="variant" class="d-block"> variant </label>
          <select v-model="variant" class="w-100" id="variant">
            <option v-for="v in variants">
              {{ v }}
            </option>
          </select>

          <label for="size" class="d-block"> size </label>
          <AInput type="number" :size="12" v-model="size" />
        </div>
      </div>

      <br />
    </div>
  </div>
</template>

<style></style>
