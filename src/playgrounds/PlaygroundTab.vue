<script setup>
const props = defineProps({
  modelValue: {
    type: String
  },
  items: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="playground-tab">
    <div
      class="tab-item"
      :class="{ 'tab-item--active': item === modelValue }"
      v-for="item in items"
      :key="item"
      @click="emit(`update:modelValue`, item)"
    >
      {{ item }}
    </div>
  </div>
</template>

<style scoped>
.playground-tab {
  display: flex;
  border-bottom: 1px solid var(--a-c-primary-500);
}

.tab-item {
  padding: 9px 11px;
  cursor: pointer;
}

.tab-item--active {
  padding: 9px 11px;
  border-bottom: 3px solid var(--a-c-primary-500);
}
</style>
