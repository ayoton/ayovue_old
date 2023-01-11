<script lang="ts" setup>
defineProps({
  items: {
    type: Object,
    default: () => ({})
  }
});
</script>

<template>
  <div>
    <!-- {{ items }} -->
    <div class="mt-2" v-for="(value, key) in items">
      <label class="d-block">{{ key }}</label>

      <select v-model="value.vModel" class="w-100">
        <option v-for="v in value.options" :key="v + ''">
          {{ v }}
        </option>
      </select>
    </div>
  </div>
</template>

<style scoped></style>
