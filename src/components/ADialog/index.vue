<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";

const emit = defineEmits(["update:modelValue"]);

const props = defineProps({
  modelValue: {
    default: false
  },
  heading: {
    default: "Modal Heading"
  },
  width: {
    type: String,
    default: "800px"
  },
  closeOnOutsideClick: {
    type: Boolean,
    default: false
  },
  hideHeader: {
    type: Boolean,
    default: false
  },
  hideFooter: {
    type: Boolean,
    default: false
  }
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
    // console.log(newValue);
    if (newValue) {
      dialogEl.value?.showModal();
    } else {
      close();
    }
  }
);

function close() {
  emit("update:modelValue", false);
  setTimeout(() => {
    dialogEl.value?.close();
  }, 250);
}
</script>

<template>
  <Transition name="dialog">
    <!-- <p v-show="modelValue">Hello</p> -->
    <dialog
      class="a-dialog"
      ref="dialogEl"
      v-show="modelValue"
      @click="handleOutsideClick"
      :style="{ width: width || '600px' }"
    >
      <slot></slot>
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
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.2);
  padding: 22px;
  border-radius: 8px;
}

.a-dialog::backdrop {
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(1px);
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
