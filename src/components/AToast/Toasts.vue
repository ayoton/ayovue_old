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
            class="a-toast-type"
            style="margin: 16px 11px; position: relative"
            :class="{ [`a-${toast.type}`]: true }"
          >
            <slot :toast="toast" :close="removeToast">
              <Toast :toast="toast" @close="removeToast"> </Toast>
            </slot>

            <div
              id="progress"
              ref="progress"
              class="a-toast__progress"
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
