<script setup lang="ts">
/**
 * Props:
 * labelField, valueField, showSearchField, variant, size,
 * clearable, isDisabled, floating label, modelValue, raw(v-model:raw),
 * placeholder, options, grouped, groupLabelField,
 * autofocus, maxHeight
 *
 * Events:
 * focus, blur, select, change, clear
 *
 * Methods:
 * blur, focus, isFocused, clearValue
 *
 * Slots:
 * append, prepend, item, selected
 *
 */

import { computed, ref, onMounted, watch } from "vue";
import {
  sizeProp,
  maxHeightProp,
  stringProp,
  variantProp,
  booleanProp,
  anyProp,
  anyArrayProp,
  labelFieldProp,
  valueFieldProp,
  stringOrNumberProp
} from "../proptypes";

const props = defineProps({
  class: stringProp,
  variant: variantProp,
  clearable: booleanProp,
  labelField: labelFieldProp,
  valueField: valueFieldProp,
  showSearchField: booleanProp,
  floatingLabel: stringProp,
  modelValue: anyProp,
  raw: anyProp,
  label: stringProp,
  value: stringProp,
  size: sizeProp,
  isDisabled: booleanProp,
  width: {
    type: String,
    default: "auto"
  },
  options: anyArrayProp,
  optionValue: {
    type: String,
    default: "value"
  },
  placeholder: stringProp,
  autofocus: booleanProp,
  maxHeight: maxHeightProp
});

const classes = computed(() => {
  return {
    "a-input": true,
    "a-select": true,
    [props.class]: true,
    [`a-${props.variant}`]: true,
    "a-input-is-floating": isFloating.value,
    select: true,
    "a-input--is-disabled": props.isDisabled
  };
});

const emit = defineEmits(["update:modelValue", "update:raw"]);

// const select = ref<HTMLInputElement | null>(null);
const filterInputEl = ref<HTMLInputElement | null>(null);
const inputParentEl = ref<HTMLElement>();
const inputFieldEl = ref<HTMLElement>();
const scrollElement = ref<HTMLElement>();

const isFocused = ref(false);
const isTop = ref(false);

const computedMaxHeight = computed(() => {
  return Number(props.maxHeight || 188);
});

//  size,
//
//  grouped, groupLabelField,
//  * autofocus

function focus() {
  inputParentEl.value?.focus();
  handleClick();
}

const isFloating = computed(() => props.modelValue || isFocused.value);

const filteredOptions = computed(() => {
  if (!filterText.value) {
    return props.options;
  }
  return props.options.filter((option) => {
    if (optionType.value === "string") {
      return option.toLowerCase().indexOf(filterText.value.toLowerCase()) > -1;
    } else {
      return (
        option[props.labelField]
          .toLowerCase()
          .indexOf(filterText.value.toLowerCase()) > -1
      );
    }
  });
});

const optionType = computed(() => {
  return typeof props.options[0] === "object" ? "object" : "string";
});

function handleClick() {
  isFocused.value = !isFocused.value;
  const el: HTMLElement = inputFieldEl.value!!;
  // console.log(el.getBoundingClientRect());
  const viewportOffset: any = el.getBoundingClientRect();
  // these are relative to the viewport, i.e. the window
  var top = viewportOffset.top;
  // var left = viewportOffset.left;
  const availableBottomSpace = innerHeight - top - el.offsetHeight;
  // console.log(availableBottomSpace);
  isTop.value = availableBottomSpace < 222;
}

function handleBlur() {
  setTimeout(() => {
    if (!inputParentEl.value?.contains(document.activeElement)) {
      isFocused.value = false;
    }
  }, 111);
}

function handleDropdownClick(e: Event) {
  e.stopPropagation();
}

function updateValue(option: any) {
  inputParentEl.value?.focus();

  emit(
    "update:modelValue",
    optionType.value === "string" ? option : option[props.valueField]
  );
  emit("update:raw", option);
  isFocused.value = false;
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
    scrollIntoView();
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    hoverIndex.value =
      hoverIndex.value > 0
        ? hoverIndex.value - 1
        : filteredOptions.value.length - 1;
    scrollIntoView();
  } else if (e.key === "Enter" && hoverIndex.value > -1) {
    updateValue(filteredOptions.value[hoverIndex.value]);
  } else if (
    e.key !== "Backspace" &&
    e.key !== "Alt" &&
    e.key !== "Control" &&
    e.key !== "Tab"
  ) {
    setTimeout(() => {
      if (!filterText.value) {
        filterText.value = e.key;
      }
    }, 0);
    setTimeout(() => {
      filterInputEl.value?.focus();
    }, 0);
  }
}

function scrollIntoView() {
  setTimeout(() => {
    const hoveredElement: HTMLElement | null = document.querySelector(
      `#option${hoverIndex.value}`
    );

    const st = computedMaxHeight.value + (scrollElement.value?.scrollTop || 0);
    const hoveredElementTop = hoveredElement?.offsetTop || 0;

    if (
      st < hoveredElementTop ||
      st > hoveredElementTop + computedMaxHeight.value
    ) {
      hoveredElement?.scrollIntoView();
    }
  }, 111);
}

onMounted(() => {
  // console.log(slots.prepend);
  if (props.autofocus) {
    focus();
  }
});

const hoverIndex = ref(-1);
const filterText = ref("");

watch(filterText, (currentValue: string, oldValue: string) => {
  hoverIndex.value = -1;
});

function resetFilter() {
  filterText.value = "";
}

function clearValue(e: Event) {
  e.stopPropagation();
  emit("update:modelValue", "");
}

const floatingStyle = computed(() => {
  if (!inputFieldEl.value || !inputParentEl.value) {
    return {};
  }
  if (!isFloating.value) {
    return {
      top: inputFieldEl.value?.offsetTop! + "px",
      left: inputFieldEl.value?.offsetLeft! + "px",
      height: inputFieldEl.value?.clientHeight! + "px"
    };
  } else {
    return {
      top: `var(--floating-pos-top, -1.5em)`,
      left: `var(--floating-pos-left, 0.15em)`,
      zIndex: "1"
    } as any;
  }
});

const rawValue = computed(() => {
  if (optionType.value === "string" || !props.modelValue) {
    return props.modelValue;
  }
  const filteredOptions = props.options.filter((option) => {
    return option[props.valueField] === props.modelValue;
  });

  // console.log(filteredOptions);
  return filteredOptions[0];
});

const valueOfModelValue = computed(() => {
  if (optionType.value === "string") {
    return props.modelValue;
  } else {
    const mv = props.raw;
    return mv[props.valueField];
  }
});

defineExpose({
  clearValue,
  isFocused,
  focus,
  blur
});
</script>

<template>
  <!-- {{ isFocused }}
  {{ autofocus }} -->
  <div
    :class="classes"
    :style="{ width: width || 'auto', '--a-font-size': `${size || 16}px` }"
    ref="inputParentEl"
    aria-label="Select Box"
    tabindex="0"
    @blur="handleBlur"
    @click="handleClick"
    @keydown="handleKeydown"
  >
    <span class="a-fl-label" v-if="floatingLabel" :style="floatingStyle">
      {{ floatingLabel }}
    </span>
    <slot name="prepend"></slot>
    <div ref="inputFieldEl" class="a-input-field a-select-field">
      <div v-if="modelValue && rawValue">
        <slot name="selected" :activeOption="raw">
          {{ optionType === "string" ? rawValue : rawValue[labelField] }}
        </slot>
      </div>

      <div v-else-if="!floatingLabel" class="a-placeholder">
        {{ placeholder }}
      </div>
    </div>

    <slot name="append"></slot>

    <div
      class="a-icon-close a-action-btn"
      v-if="clearable && modelValue"
      @click.prevent="clearValue"
    ></div>

    <div
      class="a-icon-chevron-down a-action-btn"
      :class="{ 'a-rotated-180': isFocused }"
    ></div>

    <Transition name="dropdown">
      <div
        class="a-select__dropdown"
        v-show="isFocused"
        :class="{ 'a-select__dropdown--top': isTop }"
        @click="handleDropdownClick"
      >
        <div
          class="a-select__filter d-flex ai-center jc-between"
          v-if="filterText || showSearchField"
        >
          <div class="a-icon-search a-select__search-icon"></div>
          <input
            type="text"
            placeholder="Search"
            class="a-select__filter-input flex-1"
            v-model="filterText"
            @blur="handleBlur"
            ref="filterInputEl"
          />
        </div>

        <div
          class="a-select__dropdown-fixed"
          ref="scrollElement"
          :style="{ maxHeight: computedMaxHeight + `px` }"
        >
          <template v-if="optionType === 'string'">
            <button
              v-for="(option, i) in filteredOptions"
              :id="`option` + i"
              :key="option"
              class="a-select__option"
              :class="{
                'a-select__option--active': modelValue === option,
                'a-select__option--hovered': hoverIndex === i
              }"
              @mouseover="hoverIndex = i"
              @mouseleave="hoverIndex = -1"
              @click="updateValue(option)"
            >
              <slot name="option" :option="option">
                {{ option }}
              </slot>
            </button>
          </template>

          <template v-else>
            <div
              v-for="(option, i) in filteredOptions"
              :id="`option` + i"
              :key="option"
              class="a-select__option"
              :class="{
                'a-select__option--active':
                  option[valueField] === valueOfModelValue,
                'a-select__option--hovered': hoverIndex === i
              }"
              @click="updateValue(option)"
              @mouseover="hoverIndex = i"
              @mouseleave="hoverIndex = -1"
            >
              <slot name="option" :option="option">
                {{ option[labelField] }}
              </slot>
            </div>
          </template>

          <div
            v-if="filteredOptions.length === 0"
            class="text-center"
            @click="isFocused = false"
          >
            No option available
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
