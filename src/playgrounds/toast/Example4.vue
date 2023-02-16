<script lang="ts" setup>
import { reactive, computed, ref } from "vue";

const arr = ref([
  {
    name: "Hasinoor",
    due: 500,
    key: 1
  },
  {
    name: "Zibon",
    due: 300,
    key: 2
  },
  {
    name: "Naim",
    due: 200,
    type: "",
    key: 3
  },

  {
    name: "Naim",
    due: 39,
    key: 4
  },
  {
    name: "Faruk",
    due: 100,
    key: 5
  }
]);

function remove(i: any) {
  arr.value.splice(i, 1);
}
</script>

<template>
  <div>
    <ul>
      <li v-for="(person, i) in arr" :key="person.key">
        <span>
          {{ person.name }}
        </span>

        <input type="text" />
        <span @click="remove(i)">x</span>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
