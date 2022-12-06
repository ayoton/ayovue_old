<script lang="ts" setup>
import { watch, ref, nextTick } from "vue"
import { onClickOutside } from "../composables"

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  closeOnOutsideClick: {
    type: Boolean,
    default: false,
  },
  fit: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(["close", "update:modelValue"])

const close = () => {
  emit("update:modelValue", false)
  emit("close")
}

const el = ref<HTMLElement>()
const dropdownPosition = ref("a-dropdown-top")

const noop = () => {}
let clearOutsideClick = noop
const calculateStyle = () => {
  const parentRect = el.value?.parentElement?.getBoundingClientRect()
  const selfRef = el.value?.getBoundingClientRect()
  if (selfRef?.height! > window.innerHeight) {
    dropdownPosition.value = "a-dropdown-bottom"
  } else if (parentRect?.bottom! + selfRef?.height! > window.innerHeight) {
    dropdownPosition.value = "a-dropdown-top"
  } else dropdownPosition.value = "a-dropdown-bottom"
}
watch(
  () => props.modelValue,
  (v, _) => {
    if (v) {
      nextTick(calculateStyle)
      if (props.closeOnOutsideClick) {
        clearOutsideClick = onClickOutside(
          el.value?.parentElement,
          close
        ) as VoidFunction
      }
    } else {
      if (props.closeOnOutsideClick) {
        clearOutsideClick()
      }
    }
  },
  {
    flush: "post",
  }
)
</script>
<template>
  <div
    :class="{
      'a-dropdown': true,
      [dropdownPosition]: true,
      'a-dropdown-fit': fit,
      'a-dropdown-fill': !fit,
    }"
    v-show="modelValue"
    ref="el"
  >
    <slot :close="close" />
  </div>
</template>
<style>
.a-dropdown {
  position: absolute;
  width: 100%;
  margin-top: 1px;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  border-radius: 0.3em;
  left: 0;
  right: 0;
}
.a-dropdown-fill {
  width: 100%;
}
.a-dropdown-fit {
  width: fit-content;
}
.a-dropdown-bottom {
  top: 100%;
}
.a-dropdown-top {
  bottom: 100%;
}
</style>
