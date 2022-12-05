<script lang="ts" setup>
import { ref, reactive } from "vue";
import AInput from "../components/AInput/index.vue";
import { variants, sizes, inputTypes } from "./playgroundData";

const playgroundText = ref("");
const placeholder = ref("Enter your name");
const floatingLabel = ref("");
const type = ref("text");
const variant = ref("primary");
const size = ref(16);
interface AT {
  [key: string]: boolean;
}
const componentStates = reactive<AT>({
  clearable: false,
  disabled: false
});

const playgroundProps = ref({
  value: [
    {
      playgroundText: "",
      placeholder: "Enter your name",
      floatingLabel: "",
      type: "text",
      variant: "primary",
      size: 16,
      clearable: false,
      disabled: false
    },
    {
      playgroundText: "",
      placeholder: "",
      floatingLabel: "Email",
      type: "email",
      variant: "primary",
      size: 16,
      clearable: false,
      disabled: false
    },
    {
      playgroundText: "",
      placeholder: "Enter password",
      floatingLabel: "",
      type: "password",
      variant: "primary",
      size: 16,
      clearable: true,
      disabled: false
    }
  ]
});

// const inputElement = ref();
</script>
<template>
  <div class="row cols-1 cols-md-2 cols-lg-3">
    <div v-for="(props, i) in playgroundProps.value" :key="i">
      <div class="playground__item">
        <AInput
          v-model="props.playgroundText"
          :type="props.type"
          :size="props.size"
          :variant="props.variant"
          :placeholder="props.placeholder"
          :floatingLabel="props.floatingLabel"
          :clearable="props.clearable"
          :isDisabled="props.disabled"
        >
        </AInput>

        <div class="mt-3" style="font-size: 14px">
          Value: {{ props.playgroundText }}
        </div>
        <hr class="mt-2" />

        <strong class="d-block mt-2">Boolean Props</strong>

        <div class="input-state">
          <label class="mr-3 ai-center">
            <input type="checkbox" v-model="props.clearable" />
            <span class="ml-1"> clearable </span>
          </label>
        </div>

        <div class="input-state">
          <label class="mr-3 ai-center">
            <input type="checkbox" v-model="props.disabled" />
            <span class="ml-1"> disabled </span>
          </label>
        </div>

        <br />

        <strong>Other Props</strong>
        <div class="mt-2">
          <label class="d-block">Type</label>

          <select v-model="props.type" class="w-100">
            <option></option>
            <option v-for="type in inputTypes" :key="type.type">
              {{ type.type }}
            </option>
          </select>
        </div>

        <div class="mt-2">
          <label class="d-block">Variant</label>

          <select v-model="props.variant" class="w-100">
            <option v-for="v in variants" :key="v + ''">
              {{ v }}
            </option>
          </select>
        </div>

        <label>Placeholder</label> <br />
        <AInput v-model="props.placeholder" :size="12"> </AInput>

        <label class="d-block mt-2">Floating Label</label>
        <AInput v-model="props.floatingLabel" :size="12"> </AInput>

        <div class="mt-2">
          <label class="d-block">Size</label>
          <AInput type="number" v-model="props.size" :size="12"> </AInput>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
