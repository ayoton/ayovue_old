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
  }
});

const dialogEl = ref<HTMLDialogElement | null>(null);

function handleOutsideClick() {
  if (props.closeOnOutsideClick) {
    closeModal();
  }
}

function closeModal() {
  emit("update:modelValue", false);
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

function handleClick(e: MouseEvent) {
  const rect: any = dialogEl.value?.getBoundingClientRect();
  var isInDialog =
    rect.top <= e.clientY &&
    e.clientY <= rect.top + rect.height &&
    rect.left <= e.clientX &&
    e.clientX <= rect.left + rect.width;
  if (!isInDialog) {
    close();
  }
}

function close() {
  emit("update:modelValue", false);
  setTimeout(() => {
    dialogEl.value?.close();
  }, 250);
}
</script>

<template>
  <Transition name="zoom">
    <!-- <p v-show="modelValue">Hello</p> -->
    <dialog
      class="a-dialog"
      ref="dialogEl"
      v-show="modelValue"
      @click="handleClick"
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
                  <div class="modal__close" @click="closeModal">&times;</div>
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
}

.a-dialog::backdrop {
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(1px);
}

/* .fade-enter-active,
.fade-leave-active {
  transition: all 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
} */

.zoom-enter-active,
.zoom-leave-active {
  transition: all 0.25s ease;
  transform: scale(1);
}

.zoom-enter-from,
.zoom-leave-to {
  transform: scale(0.75);
  opacity: 0;
}
</style>
