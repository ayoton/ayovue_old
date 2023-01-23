<script lang="ts" setup>
import AInput from "../../components/AInput/index.vue";

defineProps({
  type: {
    type: String,
    default: "text"
  },
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
    <div v-for="(value, key) in items">
      <label class="d-block mt-2">{{ key }}</label>
      <AInput
        v-model="items[key]"
        :size="12"
        :type="type"
        :is-disabled="isDisabled"
      >
      </AInput>
    </div>
  </div>
</template>

<style scoped></style>
