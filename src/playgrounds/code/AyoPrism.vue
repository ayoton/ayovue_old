<template>
  <div
    class="code-wrapper"
    :class="{
      'code-wrapper--collapsed': hidden
    }"
    ref="codeWrapper"
    v-bind="$attrs"
  >
    <pre><code ref="codeEl" :class="language">{{code}}</code></pre>
  </div>
  <button
    class="show-hide-button mt-3"
    :class="{ 'show-hide-button--expanded': !hidden }"
    @click="hidden = !hidden"
    v-if="!fixed"
  >
    <svg style="width: 18px; height: 18px" viewBox="3 3 18 18">
      <path
        fill="green"
        d="M16.59,5.59L18,7L12,13L6,7L7.41,5.59L12,10.17L16.59,5.59M16.59,11.59L18,13L12,19L6,13L7.41,11.59L12,16.17L16.59,11.59Z"
      />
    </svg>
  </button>
</template>

<script lang="ts" setup>
import { highlight, highlightAll, highlightElement } from "prismjs";
import "prismjs/plugins/toolbar/prism-toolbar";
import "prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard";
import "./prism-theme1.css";
import { nextTick, onMounted, ref, watch, watchEffect } from "vue";
// import "prismjs/themes/prism.css";

// import "prismjs/components/prism-markup.js";

const props = defineProps({
  language: {
    type: String,
    default: "language-markup"
  },
  code: {
    type: String,
    default: "<div></div>"
  },
  fixed: {
    type: Boolean,
    default: false
  }
});

const hidden = ref(true);
const realHeight = ref(0);
const codeWrapper = ref<HTMLElement>();

const codeEl = ref();

watch(hidden, (newValue) => {
  if (props.fixed) {
    return;
  }
  if (!newValue) {
    codeWrapper.value!.style.height = realHeight.value + "px";
  } else {
    codeWrapper.value!.style.height = "0px";
  }
});

watch(
  () => props.code,
  () => {
    highlightNow();
  }
);

function highlightNow() {
  nextTick(() => {
    highlightElement(codeEl.value, false, () => {
      realHeight.value = codeWrapper.value!.scrollHeight;
      if (props.fixed) {
        codeWrapper.value!.style.height = realHeight.value + "px";
      }
    });
  });
}

onMounted(() => {
  if (props.fixed) {
    hidden.value = false;
    codeWrapper.value!.style.height = "auto";
  }

  highlightNow();
});
</script>

<style>
.code-wrapper {
  overflow: hidden;
  transition: all 0.33s;
  transform: translateZ(0);
  margin-top: 0;
  height: 0;
}
.code-wrapper:not(.code-wrapper--collapsed) {
  margin-top: 0.5rem;
}

.show-hide-button {
  padding: 0;
  border: none;
  background: #f5f2f0;
  cursor: pointer;
  width: 100%;
  padding: 2px 0;
}
.show-hide-button > svg {
  transition: all 0.33s;
}
.show-hide-button--expanded > svg {
  transform: rotate(180deg);
}

.show-hide-button:hover {
  color: rgb(151, 0, 114);
}
</style>
