<script lang="ts" setup>
import { ref } from "vue";
import AButton from "../../components/AButton/index.vue";
import ADialog from "../../components/ADialog/index.vue";

const showDialog = ref(false);
</script>

<template>
  <div class="pt-4">
    <AButton @click="showDialog = true">Show Modal</AButton>
    <ADialog v-model="showDialog" heading="This is modal title">
      <p>
        This is modal content Lorem ipsum dolor sit, amet consectetur
        adipisicing elit. Voluptatem molestias nulla assumenda laudantium amet
        quo hic quia dolorem est itaque, cum quas qui facere magni inventore
        cupiditate quae expedita mollitia?
      </p>
      <div class="mt-3">
        <AButton class="primary" @click="showDialog = false">Yes</AButton>
        <AButton class="secondary ml-3" @click="showDialog = false">No</AButton>
      </div>
    </ADialog>
  </div>
</template>

<style scoped></style>
