<script lang="ts" setup>
import { computed, useAttrs } from "vue";
import { variantProp, sizeProp, booleanProp } from "../../utils/props";

const attrs = useAttrs();
const props = defineProps({
  variant: variantProp,
  size: sizeProp,
  loading: booleanProp,
  outlined: booleanProp,
  raised: booleanProp,
  rounded: booleanProp,
  flat: booleanProp,
  text: booleanProp,
  icon: booleanProp,
  block: booleanProp
});

const classes = computed(() => {
  return {
    "a-btn": true,
    [props.variant]: true,
    [props.size]: true,
    loading: props.loading,
    outlined: props.outlined,
    raised: props.raised,
    rounded: props.rounded,
    flat: props.flat,
    text: props.text,
    icon: props.icon,
    block: props.block
  };
});

const disabled = computed(() => {
  return props.loading || Boolean(attrs.disabled);
});
</script>

<template>
  <button :class="classes" type="button" :disabled="disabled">
    <slot> </slot>
  </button>
</template>
