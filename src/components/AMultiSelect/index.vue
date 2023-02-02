<script setup lang="ts">
/**
 * Props:
 * labelField, valueField, showSearchField, variant, size,
 * clearable, isDisabled, floating label, modelValue, raw(v-model:raw),
 * placeholder, options, grouped, groupedLabelField, groupedOptionsField,
 * groupByField, autofocus, scrollHeight, loading
 *
 * Events:
 * focus, blur
 *
 * Methods:
 * blur, focus, clearValue
 *
 * Slots:
 * option, selected
 *
 */

import { computed, ref, onMounted, watch } from "vue";
import {
  sizeProp,
  scrollHeightProp,
  stringProp,
  variantProp,
  booleanProp,
  anyProp,
  anyArrayProp,
  labelFieldProp,
  valueFieldProp,
  groupedOptionsFieldProp,
  groupedLabelFieldProp,
  widthAutoProp,
  optionValueProp
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
  width: widthAutoProp,
  options: anyArrayProp,
  optionValue: optionValueProp,
  placeholder: stringProp,
  autofocus: booleanProp,
  scrollHeight: scrollHeightProp,
  grouped: booleanProp,
  groupedLabelField: groupedLabelFieldProp,
  groupedOptionsField: groupedOptionsFieldProp,
  groupByField: stringProp,
  loading: booleanProp,
  multi: {
    type: Boolean,
    default: true
  }
});

const classes = computed(() => {
  return {
    "a-input": true,
    "a-select": true,
    [props.class]: true,
    [`a-${props.variant}`]: true,
    "a-input-is-floating": isFloating.value,
    "a-input--is-disabled": props.isDisabled || props.loading,
    "a-loading": props.loading
  };
});

const emit = defineEmits(["update:modelValue", "update:raw", "blur", "focus"]);

const filterInputEl = ref<HTMLInputElement | null>(null);
const inputParentEl = ref<HTMLInputElement | null>(null);
const inputFieldEl = ref<HTMLInputElement | null>(null);
const scrollEl = ref<HTMLInputElement | null>(null);

const isFocused = ref(false);
const isPlacedTop = ref(false);

const computedScrollHeight = computed(() => {
  return Number(props.scrollHeight || 188);
});

function focus() {
  inputParentEl.value?.focus();
  handleClick();
  emit("focus");
}

const isFloating = computed(() => props.modelValue || isFocused.value);

const optionType = computed(() => {
  if (props.grouped) {
    return "object";
  }
  return typeof props.options[0] === "object" ? "object" : "string";
});

const modifiedOptions = computed(() => {
  let rawOptions = props.options;

  if (props.groupByField) {
    let groups: any = {};

    props.options.forEach((item) => {
      if (groups[item[props.groupByField]]) {
        groups[item[props.groupByField]].push(item);
      } else {
        groups[item[props.groupByField]] = [item];
      }
    });

    rawOptions = Object.keys(groups).map((key) => {
      return {
        name: key,
        options: groups[key]
      };
    });
  }

  let finalOptions: any[] = [];
  if (props.grouped || props.groupByField) {
    rawOptions.forEach((item) => {
      finalOptions = finalOptions.concat({
        [props.labelField]: item[props.groupedLabelField],
        type: "group-title"
      });
      finalOptions = finalOptions.concat(item[props.groupedOptionsField]);
    });
  } else {
    finalOptions = rawOptions;
  }

  return finalOptions;
});

const filteredOptions = computed(() => {
  if (!filterText.value) {
    return modifiedOptions.value;
  }

  return modifiedOptions.value.filter((option) => {
    if (optionType.value === "string") {
      return option.toLowerCase().indexOf(filterText.value.toLowerCase()) > -1;
    } else {
      return (
        option[props.labelField]
          .toLowerCase()
          .indexOf(filterText.value.toLowerCase()) > -1 ||
        option.type === "group-title"
      );
    }
  });
});

function handleClick() {
  isFocused.value = !isFocused.value;
  const el: HTMLElement = inputFieldEl.value!!;
  const viewportOffset: any = inputFieldEl.value?.getBoundingClientRect();
  const top = viewportOffset.top;
  const availableBottomSpace = innerHeight - top - el.offsetHeight;
  // console.log(availableBottomSpace);
  isPlacedTop.value = availableBottomSpace < props.scrollHeight;
}

function handleBlur(e: Event) {
  setTimeout(() => {
    if (!inputParentEl.value?.contains(document.activeElement)) {
      isFocused.value = false;
    }
    emit("blur");
  }, 111);
}

function handleFilterBlur() {
  inputParentEl.value?.focus();
}

function handleDropdownClick(e: Event) {
  e.stopPropagation();
}

function updateValue(option: any) {
  if (option.type === "group-title") {
    return;
  }

  inputParentEl.value?.focus();

  emit(
    "update:modelValue",
    optionType.value === "string" ? option : option[props.valueField]
  );
  emit("update:raw", option);
  isFocused.value = !isFocused.value;
  resetFilter();
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === "ArrowDown") {
    e.preventDefault();
    hoverIndex.value =
      hoverIndex.value < filteredOptions.value.length - 1
        ? hoverIndex.value + 1
        : 0;
    if (filteredOptions.value[hoverIndex.value].type === "group-title") {
      hoverIndex.value =
        hoverIndex.value < filteredOptions.value.length - 1
          ? hoverIndex.value + 1
          : 0;
    }

    scrollIntoView();
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    hoverIndex.value =
      hoverIndex.value > 0
        ? hoverIndex.value - 1
        : filteredOptions.value.length - 1;
    if (filteredOptions.value[hoverIndex.value].type === "group-title") {
      hoverIndex.value =
        hoverIndex.value > 0
          ? hoverIndex.value - 1
          : filteredOptions.value.length - 1;
    }

    scrollIntoView();
  } else if (e.key === "Enter") {
    if (hoverIndex.value > -1) {
      updateValue(filteredOptions.value[hoverIndex.value]);
    } else {
      isFocused.value = !isFocused.value;
    }
  } else if (e.code.startsWith("Key") || e.code.startsWith("Digit")) {
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

    var parentRect: any = scrollEl.value?.getBoundingClientRect();
    // What can you see?
    var parentViewableArea = {
      height: scrollEl.value?.clientHeight,
      width: scrollEl.value?.clientWidth
    };

    // Where is the child
    var childRect: any = hoveredElement?.getBoundingClientRect();
    // Is the child viewable?
    var isViewable =
      childRect.top >= parentRect.top &&
      childRect.bottom <= parentRect.top + parentViewableArea.height;

    // if you can't see the child try to scroll parent
    if (!isViewable) {
      // Should we scroll using top or bottom? Find the smaller ABS adjustment
      const scrollTop = childRect.top - parentRect.top;
      const scrollBot = childRect.bottom - parentRect.bottom;
      if (Math.abs(scrollTop) < Math.abs(scrollBot)) {
        // we're near the top of the list
        scrollEl.value!!.scrollTop += scrollTop;
      } else {
        // we're near the bottom of the list
        scrollEl.value!!.scrollTop += scrollBot;
      }
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
  emit("update:raw", {});
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
  const filteredOptions = modifiedOptions.value.filter((option) => {
    return option[props.valueField] === props.modelValue;
  });

  // console.log(filteredOptions);
  return filteredOptions[0];
});

const valueOfModelValue = computed(() => {
  if (optionType.value === "string") {
    return props.modelValue;
  } else {
    return rawValue.value[props.valueField];
  }
});

defineExpose({
  clearValue,
  isFocused,
  focus,
  blur: handleBlur
});
</script>

<template>
  <!-- {{ isFocused }} -->
  <!-- {{ isFocused }}
  {{ autofocus }} -->
  <!-- -- {{ rawValue }} -- -->
  <div
    :class="classes"
    :style="{ width: width || 'auto', '--a-font-size': `${size || 16}px` }"
    ref="inputParentEl"
    aria-label="Select Box"
    tabindex="-1"
    role="listbox"
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
        <slot name="selected" :selectedOption="rawValue">
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
        :class="{ 'a-select__dropdown--top': isPlacedTop }"
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
            @blur="handleFilterBlur"
            ref="filterInputEl"
          />
        </div>

        <div
          class="a-select__dropdown-fixed"
          ref="scrollEl"
          :style="{ maxHeight: computedScrollHeight + `px` }"
        >
          <template v-if="optionType === 'string'">
            <label
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
              role="option"
              tabindex="0"
            >
              <!-- <slot name="option" :option="option"> -->

              <input type="checkbox" />
              {{ option }}
              <!-- </slot> -->
            </label>
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
                'a-select__option--hovered': hoverIndex === i,
                'a-select__option--grouped':
                  (props.grouped || props.groupByField) &&
                  option.type !== `group-title`,
                'a-select__option--grouped-title': option.type === `group-title`
              }"
              @click="updateValue(option)"
              @mouseover="hoverIndex = i"
              tabindex="0"
              @mouseleave="hoverIndex = -1"
              role="option"
            >
              <div v-if="option.type === `group-title`">
                {{ option[labelField] }}
              </div>
              <slot name="option" :option="option" v-else>
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
