<template>
  <button :class="{ [size]: true, 'a-btn': true }">
    <slot>Button</slot>
  </button>
</template>
<script lang="ts" setup>
import { tryOnScopeDispose } from "../../tryOnScopeDispose";
defineProps({
  size: {
    type: String,
    default: "md"
  }
});
tryOnScopeDispose(() => {
  console.log("Disposed");
});
</script>
