<script lang="ts" setup>
defineProps({
  items: {
    type: Object,
    default: () => ({})
  },
  isDisabled: {
    type: Boolean,
    default: false
  }
});
</script>

<template>
  <div>
    <!-- {{ items }} -->
    <div class="mt-2" v-for="(value, key) in items">
      <label class="d-block">{{ key }}</label>

      <select v-model="value.vModel" class="w-100" :disabled="isDisabled">
        <option v-for="v in value.options" :key="v + ''">
          {{ v }}
        </option>
      </select>
    </div>
  </div>
</template>

<style scoped></style>
