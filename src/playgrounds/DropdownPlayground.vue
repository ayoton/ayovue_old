<script lang="ts" setup>
import { ref } from "vue"
// import AButton from "../components/AButton/index.vue";
import ADropdown from "../components/ADropdown/index.vue"
import AInput from "../components/AInput/index.vue"
import { variants, sizes, buttonStates } from "./playgroundData"
const variant = ref("")
const size = ref(16)
const isOpen = ref(false)
</script>
<template>
  <div class="main__container">
    <div class="main__output">
      <br /><br /><br /><br /><br /><br /><br /><br /><br />
      <br /><br /><br /><br /><br /><br /><br /><br /><br />
      <br /><br /><br /><br /><br /><br /><br /><br /><br />
      <br /><br /><br /><br /><br /><br /><br /><br /><br />
      <br /><br /><br /><br /><br /><br /><br /><br /><br />
      <br /><br /><br /><br /><br /><br /><br /><br /><br />
      <br /><br /><br /><br /><br /><br /><br /><br /><br />
      <br /><br /><br /><br /><br /><br /><br /><br /><br />
      <div class="dropdown-container">
        <div style="background: green; width: 300px">
          Hello There <button @click="isOpen = true">Open Modal</button>
        </div>
        <ADropdown v-model="isOpen" v-slot="{ close }" fit closeOnOutsideClick>
          <p>
            <button @click="close">Close modal</button>
          </p>
        </ADropdown>
      </div>
      <button @click="isOpen = false">Close modal</button>
      <br /><br /><br /><br /><br /><br /><br /><br /><br />
      <br /><br /><br /><br /><br /><br /><br /><br /><br />
      <br /><br /><br /><br /><br /><br /><br /><br /><br />
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

<style>
.dropdown-container {
  position: relative;
}
</style>
