<script setup lang="ts">
/**
 * Props:
 * labelField, keyField, showSearchField, variant, size,
 * clearable, disabled, floating label, modelValue
 * placeholder, options, grouped, groupLabelField,
 * autofocus
 *
 * Events:
 * focus, blur, select, change, clear
 *
 *
 * Methods:
 * blur, focus, isFocused, clearValue
 *
 * Slots:
 * append, prepend, item, selected
 *
 */

import { computed, PropType, ref, useSlots, onMounted, watch } from "vue";
import {
  sizeProp,
  stringProp,
  variantProp,
  booleanProp,
  stringOrNumberProp
} from "../proptypes";

const select = ref<HTMLInputElement | null>(null);
const filterInput = ref<HTMLInputElement | null>(null);
const focused = ref(false);
const isTop = ref(false);
type sizes = "sm" | "md" | "lg" | "xl" | "xxl" | string;
const props = defineProps({
  modelValue: {
    type: String,
    default: ""
  },
  label: {
    type: String,
    default: ""
  },
  value: {
    type: String,
    default: ""
  },
  state: {
    type: String,
    default: null
  },
  size: sizeProp,
  disabled: {
    type: Boolean,
    default: false
  },
  width: {
    type: String,
    default: "auto"
  },
  options: {
    type: Array<any>,
    default: []
    // default: () => []
  },
  optionLabel: {
    type: String,
    default: "name"
  },
  optionValue: {
    type: String,
    default: "value"
  },
  placeholder: {
    type: String,
    default: "--Select--"
  }
});
const emit = defineEmits(["update:modelValue", "update:value", "update:label"]);
// function handleInput(event: { target: HTMLInputElement }) {
//   // console.log(event.target.value);
//   emit("update:modelValue", event.target.value);
// }
function focusToInput() {
  //   input.value?.focus();
}
const classes = computed(() => {
  return {
    select: true,
    "select--focused": focused.value,
    "select--disabled": props.disabled,
    [props.state]: props.state
  };
});
const filteredOptions = computed(() => {
  if (!filterText.value) {
    return props.options;
  }
  return props.options.filter((option: any) => {
    if (optionType.value === "string") {
      return option.toLowerCase().indexOf(filterText.value.toLowerCase()) > -1;
    } else {
      return (
        option[props.optionLabel]
          .toLowerCase()
          .indexOf(filterText.value.toLowerCase()) > -1
      );
    }
  });
});
const activeOption = computed(() => {
  let ao = null;
  if (optionType.value === "string") {
    ao = props.options.filter((option) => option === props.modelValue)[0];
  } else {
    ao = props.options.filter(
      (option: any) => option[props.optionValue] === props.value
    )[0];
  }
  // console.log(ao);
  return ao;
});
const optionType = computed(() => {
  return typeof props.options[0] === "object" ? "object" : "string";
});
function handleClick() {
  focused.value = !focused.value;
  const el: HTMLElement = select.value!!;
  // console.log(el.getBoundingClientRect());
  const viewportOffset: any = el.getBoundingClientRect();
  // these are relative to the viewport, i.e. the window
  var top = viewportOffset.top;
  // var left = viewportOffset.left;
  const availableBottomSpace = innerHeight - top - el.offsetHeight;
  // console.log(availableBottomSpace);
  isTop.value = availableBottomSpace < 222;
}
function handleBlur(e: Event) {
  const selectEl: HTMLElement = select.value!!;
  setTimeout(() => {
    // console.dir(document.activeElement);
    if (!selectEl.contains(document.activeElement)) {
      focused.value = false;
    }
  }, 111);
}
function handleDropdownClick(e: Event) {
  e.stopPropagation();
}
function updateValue(option: any) {
  if (typeof option === "string") {
    emit("update:modelValue", option);
  } else {
    emit("update:value", option[props.optionValue]);
    emit("update:label", option[props.optionLabel]);
  }
  focused.value = false;
  resetFilter();
}
// TODO: Watch filteredText and reset hoverIndex
function handleKeydown(e: KeyboardEvent) {
  // console.log(e);
  if (e.key === "ArrowDown") {
    e.preventDefault();
    hoverIndex.value =
      hoverIndex.value < filteredOptions.value.length - 1
        ? hoverIndex.value + 1
        : 0;
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    hoverIndex.value =
      hoverIndex.value > 0
        ? hoverIndex.value - 1
        : filteredOptions.value.length - 1;
  } else if (e.key === "Enter" && hoverIndex.value > -1) {
    updateValue(filteredOptions.value[hoverIndex.value]);
  } else if (e.key !== "Backspace") {
    if (!filterText.value) {
      filterText.value = e.key;
    }
    setTimeout(() => {
      filterInput.value?.focus();
    }, 0);
  }
}
onMounted(() => {
  // console.log(slots.prepend);
});
const hoverIndex = ref(-1);
const filterText = ref("");
watch(filterText, (currentValue: string, oldValue: string) => {
  hoverIndex.value = -1;
});
function resetFilter() {
  filterText.value = "";
}
</script>

<template>
  <div
    :class="classes"
    :style="{ width: width || 'auto', '--a-font-size': `${size}px` }"
    ref="select"
    @click="handleClick"
    tabindex="-1"
    @blur="handleBlur"
    @keydown="handleKeydown"
  >
    <div class="jc-between ai-center">
      <div v-if="modelValue || label">
        <slot name="selected" :activeOption="activeOption">
          {{ modelValue || label }}
        </slot>
      </div>

      <div v-else>
        {{ placeholder }}
      </div>

      <div class="select__arrow"></div>
    </div>

    <div
      class="select__dropdown"
      v-if="focused"
      :class="{ 'select__dropdown--top': isTop }"
      @click="handleDropdownClick"
    >
      <div
        class="select__filter ai-center jc-between px-3 mb-2"
        v-if="filterText"
      >
        <input
          type="text"
          placeholder="Filter..."
          class="select__filter-input flex-1"
          v-model="filterText"
          @blur="handleBlur"
          ref="filterInput"
        />
        <div class="select__filter-close pl-2" @click="filterText = ''">X</div>
      </div>

      <template v-if="optionType === 'string'">
        <div
          v-for="(option, i) in filteredOptions"
          :key="option"
          class="select__option"
          :class="{
            'select__option--active': modelValue === option,
            'select__option--hovered': hoverIndex === i
          }"
          @mouseover="hoverIndex = i"
          @mouseleave="hoverIndex = -1"
          @click="updateValue(option)"
        >
          <slot name="option" :option="option">
            {{ option }}
          </slot>
        </div>
      </template>

      <template v-else>
        <div
          v-for="(option, i) in filteredOptions"
          :key="option"
          class="select__option"
          :class="{
            'select__option--active':
              option[optionValue] === modelValue ||
              option[optionValue] === value,
            'select__option--hovered': hoverIndex === i
          }"
          @click="updateValue(option)"
          @mouseover="hoverIndex = i"
          @mouseleave="hoverIndex = -1"
        >
          <slot name="option" :option="option">
            {{ option[optionLabel] }}
          </slot>
        </div>
      </template>

      <div
        v-if="filteredOptions.length === 0"
        class="text-center"
        @click="focused = false"
      >
        No option available
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.select {
  border: 1px solid rgb(199, 199, 199);
  padding: 0.31em 0.687em;
  border-radius: 5px;
  cursor: pointer;
  position: relative;
  font-size: var(--a-font-size);
  line-height: 1;
}
.select:focus,
.select--focused {
  outline: 3px solid var(--a-c-theme-200);
  border: 1.2px solid var(--a-c-theme-500);
}
.select__dropdown {
  position: absolute;
  top: calc(100% + 3px);
  left: 0;
  right: 0;
  max-height: 222px;
  overflow-y: auto;
  background-color: #fff;
  box-shadow: 0px 9px 8px 3px #ebebeb;
  z-index: 9;
  border: 1px solid rgb(199, 199, 199);
  padding: 9px 0;
}
.select__dropdown--top {
  top: auto;
  bottom: calc(100% + 3px);
  box-shadow: 0px -9px 8px 3px #ebebeb;
}
.select__option {
  padding: 4px 11px;
}
.select__option--hovered {
  background-color: #f5f5f5;
}
.select__option--active {
  background-color: #f1f1f1;
  border-bottom: 1px solid #fff;
  border-top: 1px solid #fff;
  font-weight: bold;
}
.select__option--active:hover {
  background-color: #f1f1f1;
}
.select__arrow {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 8px 7.5px 0 7.5px;
  border-color: #8f8f8f transparent transparent transparent;
}
.select__filter-input,
.select__filter-input:focus {
  padding: 4px 7px;
  border-radius: 3px;
  border: 1px solid #e1e1e1;
  box-shadow: none;
  outline: none;
}
</style>
