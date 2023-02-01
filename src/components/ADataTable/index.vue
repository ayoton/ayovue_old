<script setup lang="ts">
import { PropType } from "vue"

export type Filter = (rowData: any, value: any) => boolean
export interface Filters {
  [key: string]: Filter
}

const props = defineProps({
  data: { type: Array as PropType<string[] | any[]>, required: true },
  filters: {
    type: Object as PropType<Filters>,
  },
})
</script>
<template>
  <div class="a-table-container">
    <slot name="header">
      <div class="a-table-header"></div>
    </slot>
    <slot name="thead"></slot>
    <slot></slot>
    <slot name="tfooter"></slot>
    <slot name="footer">
      <div class="a-table-footer"></div>
    </slot>
  </div>
</template>
