<script lang="ts" setup>
import { ref, reactive, computed, watch, nextTick, shallowRef } from "vue";
import { variants, sizes, inputTypes } from "../utils/playgroundData";
import PlaygroundTab from "../components/PlaygroundTab.vue";
import Example1 from "./Example1.vue";

const countries = [
  { name: "Bangladesh", value: "bn", flag: "https://flagcdn.com/16x12/bd.png" },
  { name: "India", value: "in", flag: "https://flagcdn.com/16x12/in.png" },
  { name: "China", value: "cn", flag: "https://flagcdn.com/16x12/cn.png" },
  { name: "USA", value: "us", flag: "https://flagcdn.com/16x12/us.png" },
  { name: "UK", value: "uk", flag: "https://flagcdn.com/16x12/gb-eng.png" },
  { name: "Russia", value: "ru", flag: "https://flagcdn.com/16x12/ru.png" },
  { name: "Srilanka", value: "sr", flag: "https://flagcdn.com/16x12/sr.png" }
];

const tabItems = ["Example1", "Example2", "Example3"];
const selectedTab = ref("Example1");
</script>
<template>
  <div>
    <PlaygroundTab :items="tabItems" v-model="selectedTab"></PlaygroundTab>

    <Example1 v-if="selectedTab === 'Example1'"></Example1>
  </div>
</template>

<style></style>
