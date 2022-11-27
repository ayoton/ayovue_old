<script lang="ts" setup>
import { unref } from "vue"

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  onText: {
    type: String,
    default: "",
  },
  offText: {
    type: String,
    default: " ",
  },
  onVariation: {
    type: String,
    default: "primary",
  },
  offVariation: {
    type: String,
    default: "secondary",
  },
  size: {
    type: Number,
    default: 16,
  },
})
const emits = defineEmits(["update:modelValue"])
const update = () => {
  emits("update:modelValue", !unref(props.modelValue))
}
</script>
<template>
  <div
    class="switch"
    tabindex="0"
    @click="update"
    :class="{
      [`a-${onVariation}`]: modelValue,
      [`a-${offVariation}`]: !modelValue,
      'switch-off': !modelValue,
    }"
    :style="{ '--a-switch-font-size': `${size}px` }"
  >
    <div class="invisible-text">{{ onText }}</div>
    <div class="invisible-text">{{ offText }}</div>
    <div class="switch-label-wrapper">
      <div class="switch-label">
        <div class="switch-text">{{ onText }}</div>
        <div class="switch-circle"></div>
        <div class="switch-text">{{ offText }}</div>
      </div>
    </div>
  </div>
</template>
<style>
.switch {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  background-color: var(--a-c-theme-600);
  color: var(--a-c-theme-50);
  font-size: var(--a-switch-font-size, 16px);
  border-radius: 2em;
  border: none;
  height: 2em;
  cursor: pointer;
  box-sizing: border-box;
  min-width: 4em;
  overflow: hidden;
  transition: all 0.3s linear;
  margin: 0.2em;
}

.switch:focus {
  outline: 0.1em solid var(--a-c-theme-200);
}
.switch.switch-off {
  background-color: var(--a-c-theme-500);
  filter: grayscale(0.5);
}
.invisible-text {
  visibility: hidden;
  margin-left: 3em;
}

.switch-label-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: inline-flex;
}
.switch-label {
  width: 100%;
  height: 100%;
  position: relative;
  filter: unset;
}
.switch-label > * {
  transition: all 0.3s linear;
}
.switch-text {
  width: calc(100% - 2em);
  display: inline-flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  height: 100%;
}
.switch-label > .switch-circle {
  content: " ";
  background: white;
  width: 1.6em;
  height: 1.6em;
  margin: 0.2em;
  border-radius: 2em;
  display: inline-flex;
  flex-shrink: 0;
  position: absolute;
  left: calc(100% - 2em);
  background: linear-gradient(145deg, #ffffff, #e4e4e4);
}

.switch-off .switch-circle {
  left: 0%;
}

.switch-label > .switch-text:first-child {
  padding-left: 0.6em;
  left: 0;
}
.switch-off .switch-text:first-child {
  left: calc(-100% + 2em);
}
.switch-off .switch-circle {
  left: 0%;
}
.switch-text:last-child {
  padding-right: calc(2em * 0.3);
  right: calc(-100% + 2em);
}
.switch-off .switch-text:last-child {
  right: 0%;
}
</style>
