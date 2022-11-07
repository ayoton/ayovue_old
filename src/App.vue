<script lang="ts" setup>
import "../public/themes/default/all.css"
import Playground from "./playgrounds/ButtonPlayground.vue"
</script>
<template>
  <div class="playground">
    <Playground></Playground>
  </div>
</template>

<style>
body {
  color: #2c2c2c;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Liberation Sans, sans-serif;
  line-height: 1.6em;
  word-spacing: 0.05em;
  letter-spacing: 0.02em;
  font-size: 17px;
}
.playground {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.playground__container {
  display: flex;
  width: 90%;
  max-width: 960px;
  margin-left: auto;
  margin-right: auto;
}

.playground__output {
  flex: 2;
  display: flex;
  justify-content: center;
  align-items: center;
}

.playground__variations {
  flex: 1;
}

input[type="checkbox"] {
  margin-right: 8px;
}
</style>
