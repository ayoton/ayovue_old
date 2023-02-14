<template>
  <teleport to="body">
    <TransitionGroup :name="transitionName" tag="div" :class="classes">
      <div v-for="toast in toasts" :key="toast.$when">
        <Toast :toast="toast" @close="removeToast"> </Toast>
      </div>
    </TransitionGroup>
  </teleport>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import Toast from "./Toast.vue";
import { useToast } from "../composables/useToasts";
const { toasts, removeToast } = useToast();

const props = defineProps({
  position: {
    type: String,
    default: ""
  }
});

const classes = computed(() => {
  return {
    toasts: true,
    [`toasts--${props.position}`]: props.position
  };
});

const transitionNames: any = {
  "top-left": "slide-right",
  "bottom-left": "slide-right",
  "top-center": "slide-bottom",
  "bottom-center": "slide-top"
};

const transitionName = computed(() => {
  return transitionNames[props.position] || "slide-left";
});
</script>

<style scoped>
.toasts,
.toasts--top-right {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 999999;
}

.toasts--bottom-right {
  position: fixed;
  top: auto;
  bottom: 0;
  right: 0;
  left: auto;
  z-index: 999999;
}

.toasts--top-left {
  position: fixed;
  top: 0;
  left: 0;
  right: auto;
  z-index: 999999;
}

.toasts--bottom-left {
  position: fixed;
  top: auto;
  bottom: 0;
  left: 0;
  right: auto;
  z-index: 999999;
}

.toasts--top-center {
  position: fixed;
  top: 0;
  bottom: auto;
  left: 50%;
  right: auto;
  z-index: 999999;
  transform: translateX(-50%);
}

.toasts--bottom-center {
  position: fixed;
  top: auto;
  bottom: 0;
  left: 50%;
  right: auto;
  z-index: 999999;
  transform: translateX(-50%);
}

.slide-left-enter-active,
.slide-right-enter-active,
.slide-top-enter-active,
.slide-bottom-enter-active,
.slide-top-leave-active,
.slide-bottom-leave-active,
.slide-left-leave-active,
.slide-right-leave-active {
  transition: all 0.25s ease;
}
.slide-left-enter-from,
.slide-left-leave-to {
  opacity: 0;
  transform: translateX(70px);
}

.slide-right-enter-from,
.slide-right-leave-to {
  opacity: 0;
  transform: translateX(-70px);
}

.slide-bottom-enter-from,
.slide-bottom-leave-to {
  opacity: 0;
  transform: translateY(-70px);
}

.slide-top-enter-from,
.slide-top-leave-to {
  opacity: 0;
  transform: translateY(70px);
}
</style>
