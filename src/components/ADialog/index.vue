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

onMounted(() => {
  //   dialogEl.value?.showModal();
});

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
  emit("update:modelValue", false);
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
      @click="handleOutsideClick"
      :style="{ width: width || '500px' }"
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

  <!-- <teleport to="body">
    <Transition name="fade">
      <div class="modal" v-show="modelValue" @click="handleOutsideClick">
        <Transition name="zoom">
          <div
            class="modal__container"
            :style="{ width: width }"
            v-show="modelValue"
          >
            <div v-if="!hideHeader" @click.stop>
              <slot name="header">
                <div class="modal__header d-flex jc-between">
                  <div class="modal__heading">{{ heading }}</div>
                  <div class="modal__close" @click="close">&times;</div>
                </div>
              </slot>
            </div>

            <div class="modal__body" @click.stop>
              <slot></slot>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </teleport> -->
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

.a-dialog__footer {
  /* height: 40px; */
}

.dialog-enter-active,
.dialog-leave-active {
  transition: all 0.25s ease;
  transform: scale(1);
}

.dialog-enter-active::backdrop,
.dialog-leave-active::backdrop {
  transition: all 0.25s ease;
}

.dialog-enter-from,
.dialog-leave-to {
  transform: scale(0.75);
  opacity: 0;
}

.dialog-enter-from::backdrop,
.dialog-leave-to::backdrop {
  opacity: 0;
}
</style>
