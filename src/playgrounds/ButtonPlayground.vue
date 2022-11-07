<script lang="ts" setup>
import { ref } from "vue";
import AButton from "../components/AButton/index.vue";
import { colors, sizes, buttonStates } from "./playgroundData";
const color = ref("");
const size = ref("");
</script>
<template>
  <div class="playground__container">
    <div class="playground__output">
      <AButton
        :outlined="buttonStates.outlined"
        :raised="buttonStates.raised"
        :rounded="buttonStates.rounded"
        :flat="buttonStates.flat"
        :text="buttonStates.text"
        :icon="buttonStates.icon"
        :loading="buttonStates.loading"
        :block="buttonStates.block"
        :color="color"
        :size="size"
        >Click me</AButton
      >
    </div>

    <div class="playground__variations">
      <strong>Button Props</strong>
      <div v-for="(value, buttonState) in buttonStates" :key="buttonState">
        <label>
          <input type="checkbox" v-model="buttonStates[buttonState]" />
          <span>
            {{ buttonState }}
          </span>
        </label>
      </div>
      <br />

      <label for="color"> Color </label>

      <select v-model="color" class="mr-3" id="color">
        <option v-for="c in colors">
          {{ c }}
        </option>
      </select>

      <br />
      <br />
      <label for="size"> Size </label>
      <select v-model="size" id="size">
        <option v-for="s in sizes">
          {{ s }}
        </option>
      </select>
    </div>
  </div>
</template>

<style></style>
