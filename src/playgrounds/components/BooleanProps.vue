<script lang="ts" setup>
defineProps({
  items: {
    type: Object,
    default: () => ({})
  }
});
</script>

<template>
  <div class="d-flex fw-wrap">
    <div class="input-state" v-for="(value, key) in items">
      <label class="mr-3 ai-center">
        <input type="checkbox" v-model="items[key]" />
        <span class="ml-1"> {{ key }} </span>
      </label>
    </div>
  </div>
</template>

<style scoped></style>
