<script lang="ts" setup>
import { computed } from "@vue/reactivity";
import { ref, StyleValue, useAttrs } from "vue";
import {
  inputTypeProp,
  sizeProp,
  stringProp,
  variantProp,
  booleanProp,
  stringOrNumberProp,
  nameProp
} from "../proptypes";
const inputParent = ref<HTMLElement>();
const inputField = ref<HTMLElement>();

const props = defineProps({
  type: inputTypeProp,
  floatingLabel: stringProp,
  modelValue: stringOrNumberProp,
  size: sizeProp,
  variant: variantProp,
  clearable: booleanProp,
  placeholder: stringProp,
  isDisabled: booleanProp,
  name: nameProp,
  class: stringProp
});

const emit = defineEmits(["update:modelValue"]);

const isFocused = ref(false);
const isFloating = computed(() => props.modelValue || isFocused.value);
const floatingStyle = computed(() => {
  if (!inputField.value || !inputParent.value) {
    return {};
  }
  if (!isFloating.value) {
    return {
      top: inputField.value?.offsetTop! + "px",
      left: inputField.value?.offsetLeft! + "px",
      height: inputField.value?.clientHeight! + "px"
    };
  } else {
    return {
      top: `var(--floating-pos-top, -1.5em)`,
      left: `var(--floating-pos-left, 0.15em)`,
      zIndex: "1"
    } as any;
  }
});
const classes = computed(() => {
  return {
    [props.class]: true,
    "a-input": true,
    [`a-${props.variant}`]: true,
    "a-input-is-floating": isFloating.value
  };
});

function clearValue() {
  emit("update:modelValue", "");
}

const localValue = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  }
});
</script>
<template>
  <div
    :class="classes"
    ref="inputParent"
    :style="{ '--a-font-size': `${size}px` }"
  >
    <span class="a-fl-label" v-if="floatingLabel" :style="floatingStyle">
      {{ floatingLabel }}
    </span>
    <slot name="prepend"></slot>
    <input
      @focus="isFocused = true"
      @blur="isFocused = false"
      ref="inputField"
      :type="type"
      class="a-input-field"
      :placeholder="placeholder"
      v-model="localValue"
      :disabled="isDisabled"
      autocomplete="off"
      :name="name"
      v-bind="$attrs"
    />
    <slot name="append"></slot>

    <div
      class="a-icon-close a-action-btn"
      v-if="clearable && modelValue"
      @click="clearValue"
    ></div>
  </div>
</template>
