<script lang="ts" setup>
import AButton from "../components/AButton/index.vue";
import vTooltip from "../components/ATooltip";
</script>

<template>
  <div>
    <h1>Tooltip</h1>
    <p class="mt-2">Tooltip is ....</p>
    <br />

    <div class="row">
      <div class="col-md-6">
        <div class="mb-2">Simple tooltip</div>

        <AButton v-tooltip="'Click to submit'">Submit</AButton>

        <div class="mt-4 mb-2">Tooltip positioning</div>

        <AButton
          v-tooltip.left="
            'Tooltip on left Tooltip on left Tooltip on left Tooltip on left Tooltip on left Tooltip on left '
          "
        >
          Left
        </AButton>
        <AButton
          v-tooltip.top="
            'Tooltip on top Tooltip on top Tooltip on top Tooltip on top '
          "
          class="ml-2"
          >Top</AButton
        >
        <AButton v-tooltip.bottom="'Tooltip on bottom'" class="ml-2">
          Bottom
        </AButton>
        <AButton v-tooltip.right="'Tooltip on right'" class="ml-2"
          >Right</AButton
        >
      </div>
      <div class="col-md-6"></div>
    </div>
  </div>
</template>

<style scoped></style>
