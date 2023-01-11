<script lang="ts" setup>
import VueJsonPretty from "vue-json-pretty";
import "vue-json-pretty/lib/styles.css";

defineProps({
  items: {
    type: Object,
    default: () => ({})
  }
});
</script>

<template>
  <div>
    <div v-for="(value, key) in items">
      <div class="mt-2">{{ key }}:</div>
      <vue-json-pretty :data="value" />
    </div>
  </div>
</template>

<style scoped></style>
