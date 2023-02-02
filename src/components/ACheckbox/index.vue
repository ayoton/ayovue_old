<script setup lang="ts">
import { computed, unref } from "@vue/reactivity"

const emits = defineEmits<{
  (e: "update:modelValue", value: boolean): void
  (e: "click", value: MouseEvent): void
  (e: "change", value: Event): void
}>()

const props = defineProps({
  modelValue: Boolean,
  size: {
    type: String,
    default: "md",
  },
  label: {
    type: String,
  },
  color: {
    type: String,
    default: "primary",
  },
  solid: {
    type: Boolean,
    default: false,
  },
  rounded: {
    type: Boolean,
    default: false,
  },
})

const value = computed({
  get: () => {
    return props.modelValue
  },
  set: (v) => {
    emits("update:modelValue", v)
  },
})

const classes = computed(() => {
  return {
    [props.color]: true,
    solid: props.solid,
    rounded: props.rounded,
  }
})
</script>
<template>
  <label :class="{ 'labeled-checkbox': true, [size]: true }">
    <input
      type="checkbox"
      v-model="value"
      class="checkbox"
      :class="classes"
      v-bind="$attrs"
      @click="$emit('click', $event)"
      @change="$emit('change', $event)"
    />
    <span v-if="label">{{ label }}</span>
  </label>
</template>
<style>
.labeled-checkbox {
  display: inline-flex;
  align-items: center;
  gap: calc(var(--size) * 0.2);
  line-height: normal;
  margin: calc(var(--size) * 0.1);
  height: var(--size);
}

.labeled-checkbox.sm {
  --size: 21.5px;
}
.labeled-checkbox.md {
  --size: 33px;
}
.labeled-checkbox.lg {
  --size: 45.5px;
}
.labeled-checkbox.xl {
  --size: 71px;
}
.labeled-checkbox.xxl {
  --size: 117px;
}

.labeled-checkbox > span {
  font-size: calc(var(--size) * 0.6);
  height: calc(var(--size) * 0.8);
}
.checkbox[type="checkbox"]:not(.solid) {
  --tick-color: var(--ac-theme-600);
  --background-color: white;
}
.checkbox[type="checkbox"].solid {
  --tick-color: white;
  --background-color: var(--ac-theme-600);
}
.checkbox[type="checkbox"] {
  --cbsize: calc(var(--size) * 0.8);
  --disabled-color: var(--ac-gray-300);
  -webkit-appearance: none;
  appearance: none;
  background-color: var(--background-color);
  margin: 0;
  font: inherit;
  color: var(--tick-color);
  width: var(--cbsize);
  height: var(--cbsize);
  border: 0.15em solid var(--ac-theme-600);
  border-radius: calc(var(--cbsize) * 0.17);
  transform: translateY(-0.075em);
  display: inline-flex;
  justify-content: center;
  align-items: center;
  place-content: center;
  transition: 120ms all ease-in-out;
  cursor: pointer;
}
.checkbox[type="checkbox"].rounded {
  border-radius: calc(var(--cbsize) * 0.5);
}
.checkbox[type="checkbox"].solid:not(:checked) {
  background: var(--tick-color);
}

.checkbox[type="checkbox"]::before {
  content: "";
  width: calc(var(--cbsize) * 0.6);
  height: calc(var(--cbsize) * 0.6);
  clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
  transform: scale(0);
  transform-origin: center;
  box-shadow: inset 1em 1em var(--tick-color);
  background-color: var(--tick-color);
}
.checkbox[type="checkbox"]:checked::before {
  transform: scale(1);
}
.checkbox[type="checkbox"]:focus {
  outline: calc(var(--cbsize) * 0.1) solid var(--ac-theme-300);
}
.checkbox[type="checkbox"]:disabled {
  --tick-color: var(--disabled-color);
  color: var(--disabled-color);
  cursor: not-allowed;
}
.checkbox[type="checkbox"]:not(:checked) {
  border-color: var(--ac-gray-400);
}
.checkbox[type="checkbox"]:not(:checked):hover {
  border-color: var(--ac-theme-500);
}
</style>
