<script lang="ts" setup>
import AButton from "../components/AButton/index.vue";
import vTooltip from "../components/ATooltip";
</script>

<template>
  <div>
    <h1>Tooltip</h1>
    <p class="mt-2">Tooltip is ....</p>
    <br />

    Simple tooltip

    <AButton v-tooltip="'Click to submit'">Submit</AButton>
    <AButton
      v-tooltip="
        'Click here to save Click here to save Click here to save Click here to save '
      "
      class="ml-2"
    >
      Save
    </AButton>
    <AButton v-tooltip="'Click to cancel'" class="ml-2">Cancel</AButton>

    <br /><br /><br /><br />

    Tooltip positioning

    <AButton
      v-tooltip.left="
        'Tooltip on left Tooltip on left Tooltip on left Tooltip on left Tooltip on left Tooltip on left '
      "
      >Left</AButton
    >
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
    <AButton v-tooltip.right="'Tooltip on right'" class="ml-2">Right</AButton>
  </div>
</template>

<style scoped></style>
