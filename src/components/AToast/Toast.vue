<script lang="ts" setup>
import { computed, ref } from "vue";
import type { PropType } from "vue";
import type { ToastItem } from "../composables/useToasts";
import { useToast } from "../composables/useToasts";

const { removeToast } = useToast();

const emit = defineEmits(["close"]);

const props = defineProps({
  toast: {
    type: Object as PropType<ToastItem>,
    default: () => ({})
  }
});

const classes = computed(() => {
  return {
    toast: true,
    [props.toast.type]: true
  };
});

function closeToast() {
  emit("close", props.toast);
}

const playingAnimation = ref(true);

function endAnimation() {
  removeToast(props.toast);
}
</script>

<template>
  <div
    :class="classes"
    @mouseover="playingAnimation = false"
    @mouseleave="playingAnimation = true"
  >
    <slot>
      <div class="toast__icon">
        <div class="gg-check" v-if="toast.type === 'success'"></div>
        <div
          class="gg-danger"
          v-if="toast.type === 'danger' || toast.type === 'warning'"
        ></div>
        <div class="gg-info" v-if="toast.type === 'info'"></div>
      </div>
      <div class="toast__content">
        <div class="toast__heading">
          {{ toast.summary }}
        </div>

        <div class="toast__body" @click.stop>
          <slot>
            {{ toast.detail }}
          </slot>
        </div>
      </div>
      <div class="toast__close" @click="closeToast">&times;</div>
    </slot>

    <div
      id="progress"
      ref="progress"
      class="toast__progress"
      :style="{
        animation: `toastprogress ${toast.duration!! / 1000}s`,
        animationTimingFunction: 'linear',
        animationPlayState: playingAnimation ? 'running' : 'paused'
      }"
      @animationend="endAnimation"
    >
      <!-- {{ playingAnimation }} -->
    </div>
  </div>
</template>

<style>
.toast {
  color: var(--a-c-theme-600);
  background-color: var(--a-c-theme-50);
  border-left: 4px solid var(--a-c-theme-600);
  margin: 16px 11px;
  /* box-shadow: 0 0 7px 3px rgb(0 0 0 / 8%); */
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  display: flex;
  align-items: flex-start;
  width: 333px;
  position: relative;
}

.toast__icon {
  padding: 13px 2px 9px 9px;
}

.toast__content {
  flex: 1;
}

.toast__heading {
  font-size: 16px;
  font-weight: bold;
  padding: 9px 11px 0 11px;
}
.toast__close {
  cursor: pointer;
  padding: 9px;
  font-size: 27px;
}
.toast__close:hover {
  color: red;
}
.toast__body {
  padding: 0 11px 11px 11px;
  border-radius: 9px;
}

.checkmark {
  font-family: arial;
  -ms-transform: scaleX(-1) rotate(-35deg); /* IE 9 */
  -webkit-transform: scaleX(-1) rotate(-35deg); /* Chrome, Safari, Opera */
  transform: scaleX(-1) rotate(-35deg);
  font-size: 20px;
}

.gg-danger {
  box-sizing: border-box;
  position: relative;
  display: block;
  transform: scale(var(--ggs, 1));
  width: 20px;
  height: 20px;
  border: 2px solid;
  border-radius: 40px;
}
.gg-danger::after,
.gg-danger::before {
  content: "";
  display: block;
  box-sizing: border-box;
  position: absolute;
  border-radius: 3px;
  width: 2px;
  background: currentColor;
  left: 7px;
}
.gg-danger::after {
  top: 2px;
  height: 8px;
}
.gg-danger::before {
  height: 2px;
  bottom: 2px;
}

.gg-info {
  box-sizing: border-box;
  position: relative;
  display: block;
  transform: scale(var(--ggs, 1));
  width: 20px;
  height: 20px;
  border: 2px solid;
  border-radius: 40px;
}

.gg-info::after,
.gg-info::before {
  content: "";
  display: block;
  box-sizing: border-box;
  position: absolute;
  border-radius: 3px;
  width: 2px;
  background: currentColor;
  left: 7px;
}

.gg-info::after {
  bottom: 2px;
  height: 8px;
}

.gg-info::before {
  height: 2px;
  top: 2px;
}

.gg-check {
  box-sizing: border-box;
  position: relative;
  display: block;
  transform: scale(var(--ggs, 1));
  width: 22px;
  height: 22px;
  border: 2px solid transparent;
  border-radius: 100px;
}

.gg-check::after {
  content: "";
  display: block;
  box-sizing: border-box;
  position: absolute;
  left: 1px;
  top: -7px;
  width: 8px;
  height: 14px;
  border-width: 0 2px 2px 0;
  border-style: solid;
  transform-origin: bottom left;
  transform: rotate(45deg);
}

.toast__progress {
  min-height: 1px;
  background-color: var(--a-c-theme-600);
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0%;
  color: #fff;
  /* animation: toastprogress 5s infinite; */
  /* animation-timing-function: linear; */
  /* animation-play-state: running; */
  /* animation-play-state: paused; */
}

.toast__progress:hover {
  animation-play-state: paused;
}

@keyframes toastprogress {
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
}
</style>
