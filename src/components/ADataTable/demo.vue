<script lang="ts" setup>
import ADataTable from "./index.vue"
import type { Filters } from "./index.vue"
const data: any[] = []
const filters: Filters = {
  createdAt: (row, value) => {
    return row.createdAt > value
  },
}
</script>

<template>
  <ADataTable :data="data" :filters="filters" />
</template>
