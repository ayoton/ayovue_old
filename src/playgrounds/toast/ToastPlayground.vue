<script lang="ts" setup>
import { ref, computed } from "vue";
import PlaygroundTab from "../components/PlaygroundTab.vue";
import Example1 from "./Example1.vue";
import Example2 from "./Example2.vue";
import Example3 from "./Example3.vue";
import Example4 from "./Example4.vue";

const tabItems = ["Example1", "Example2", "Example3", "Example4"];
const selectedTab = ref(tabItems[0]);

const components: any = {
  Example1: Example1,
  Example2: Example2,
  Example3: Example3,
  Example4: Example4
};

const is = computed(() => {
  return components[selectedTab.value];
});
</script>
<template>
  <div>
    <PlaygroundTab :items="tabItems" v-model="selectedTab"></PlaygroundTab>

    <component :is="is"></component>
  </div>
</template>

<style></style>
