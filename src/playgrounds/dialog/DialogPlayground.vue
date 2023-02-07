<script lang="ts" setup>
import { ref, reactive, computed, watch, nextTick, shallowRef } from "vue";
import { variants, sizes, inputTypes } from "../utils/playgroundData";
import PlaygroundTab from "../components/PlaygroundTab.vue";
import Example1 from "./Example1.vue";
import Example2 from "./Example2.vue";
// import Example3 from "./Example3.vue";
// import Example4 from "./Example4.vue";
// import Example5 from "./Example5.vue";

const tabItems = ["Example1", "Example2", "Example3", "Example4", "Example5"];
const selectedTab = ref(tabItems[1]);

const components: any = {
  Example1: Example1,
  Example2: Example2
  //   Example3: Example3,
  //   Example4: Example4,
  //   Example5: Example5
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
