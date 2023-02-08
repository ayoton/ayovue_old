<script lang="ts" setup>
import { onMounted, ref, watch, useSlots } from "vue";
import { stringProp, booleanProp } from "../proptypes";

/***
 * Props: modelValue, title, width, closeOnOutsideClick, hideHeader
 * Slots: header, footer
 */

const emit = defineEmits(["update:modelValue"]);
const slots = useSlots();

const props = defineProps({
  modelValue: booleanProp,
  title: stringProp,
  width: {
    type: String,
    default: "800px"
  },
  closeOnOutsideClick: booleanProp,
  hideHeader: booleanProp
});

const dialogEl = ref<HTMLDialogElement | null>(null);

function handleOutsideClick(e: MouseEvent) {
  if (props.closeOnOutsideClick) {
    const rect: any = dialogEl.value?.getBoundingClientRect();
    const isInDialog =
      rect.top <= e.clientY &&
      e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX &&
      e.clientX <= rect.left + rect.width;
    if (!isInDialog) {
      close();
    }
  }
}

watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue) {
      dialogEl.value?.showModal();
    } else {
      close();
    }
  }
);

function close() {
  if (props.modelValue) {
    emit("update:modelValue", false);
  }
}

function open() {
  emit("update:modelValue", true);
}

defineExpose({ close, open });
</script>

<template>
  <Transition name="dialog" @after-leave="dialogEl?.close()">
    <dialog
      class="a-dialog"
      ref="dialogEl"
      v-show="modelValue"
      @click.stop="handleOutsideClick"
      :style="{ width: width || '500px' }"
      @cancel.prevent="close"
    >
      <slot name="header" :close="close">
        <div class="a-dialog__header d-flex ai-center" v-if="!hideHeader">
          <div class="a-dialog__title flex-1">
            {{ title }}
          </div>
          <div class="a-dialog__close">
            <div class="a-icon-close a-action-btn" @click="close()"></div>
          </div>
        </div>
      </slot>
      <div class="a-dialog__body">
        <slot></slot>
      </div>
      <div class="a-dialog__footer" v-if="slots['footer']">
        <slot name="footer" :close="close"> </slot>
      </div>
    </dialog>
  </Transition>
</template>

<style>
.a-dialog {
  margin: auto;
  border: none;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 2px 50px 2px rgba(0, 0, 0, 0.5);
  border-radius: 4px;
}

.a-dialog::backdrop {
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(1px);
}

.a-dialog__header {
  height: 40px;
  background-color: var(--a-c-gray-50);
  font-weight: 700;
  font-size: 16px;
  color: var(--a-c-gray-700);
}

.a-dialog__title {
  padding: 0 1em;
}

.a-dialog__close {
  padding: 0.75em 1em;
}

.a-dialog__body {
  flex: 1;
  overflow-y: auto;
  padding: 0.5em 1em;
}
</style>
