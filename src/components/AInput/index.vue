<script lang="ts" setup>
import "ayovue/themes/base/reset.css"
defineProps({
  size: {
    type: String,
    default: "md",
  },
})
</script>
<template>
  <input :class="{ [size]: true }" />
</template>
