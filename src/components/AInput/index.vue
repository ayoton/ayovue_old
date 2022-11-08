<script lang="ts" setup>
import { computed } from "@vue/reactivity";
import { ref } from "vue";
import {
  inputTypeProp,
  sizeProp,
  stringProp,
  stateProp,
  booleanProp,
  widthProp
} from "../../utils/props";
const inputParent = ref<HTMLElement>();
const inputField = ref<HTMLElement>();
const props = defineProps({
  type: inputTypeProp,
  floatingLabel: stringProp,
  modelValue: stringProp,
  size: sizeProp,
  state: stateProp,
  clearable: booleanProp,
  placeholder: stringProp
});
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
      top: `var(--floating-pos-top, calc(-1.5 * var(--font-size, 16px)))`,
      left: `var(--floating-pos-left, calc(0.15 * var(--font-size, 16px)))`,
      height: inputField.value?.clientHeight! + "px"
    };
  }
});
const classes = computed(() => {
  return {
    "a-input": true,
    [props.size]: true,
    [props.state]: true
  };
});
</script>
<template>
  <div :class="classes" ref="inputParent">
    <span class="fl-label" v-if="floatingLabel" :style="floatingStyle">
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
      v-model="modelValue"
    />
    <slot name="append"></slot>
  </div>
</template>
