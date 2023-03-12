<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import Toast from "./Toast.vue";
import { useToast } from "../composables/useToasts";
const { toasts, removeToast } = useToast();

const props = defineProps({
  position: {
    type: String,
    default: ""
  },
  group: {
    type: String,
    default: "default"
  }
});

const groupedToasts = computed(() => {
  return [...toasts].filter((toast) => {
    return (
      toast.group === props.group || (props.group === "default" && !toast.group)
    );
  });
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

function endAnimation(toast: any) {
  removeToast(toast);
}
</script>

<template>
  <teleport to="body">
    <div class="a-toasts-container">
      <TransitionGroup :name="transitionName" tag="div" :class="classes">
        <div
          v-for="toast in groupedToasts"
          :key="toast.$when"
          class="p-relative"
        >
          <div
            style="margin: 16px 11px; position: relative"
            :class="{ [`a-${toast.type}`]: true }"
          >
            <slot :toast="toast" :close="removeToast">
              <Toast :toast="toast" @close="removeToast"> </Toast>
            </slot>

            <div
              id="progress"
              ref="progress"
              class="a-toast-progress"
              :style="{
                '--animation': `toastprogress ${toast.duration!! / 1000}s`
              }"
              @animationend="endAnimation(toast)"
            ></div>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </teleport>
</template>

<style>
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

.a-toast-progress {
  min-height: 1px;
  background-color: var(--a-c-theme-600);
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0%;
  color: #fff;
  animation: var(--animation);
  animation-timing-function: linear;
  animation-play-state: running;
  z-index: 9999;
}

/* .a-toasts-container:hover .a-toast-progress {
  animation-play-state: paused;
} */

@keyframes toastprogress {
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
}
</style>
