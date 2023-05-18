<script lang="ts" setup>
import { reactive, ref, watch, watchEffect } from "vue";
import ACollapse from "../../components/ACollapse/index.vue";
import AButton from "../../components/AButton/index.vue";

const showing = ref(false);

// const rd = reactive({
//   level1: "bar",
//   level11: {
//     level2: "moo"
//   }
// });

// watch(
//   rd,
//   (oldValue, newValue, extra) => {
//     console.log(extra);
//   },
//   {
//     onTrigger(e) {
//       console.log(e);
//     },
//     deep: true
//   }
// );

function showHide() {
  showing.value = !showing.value;
  // rd.level11.level2 = Math.random() + "";
}
</script>

<template>
  <div class="mt-4">
    <AButton @click="showHide()">Show / Hide</AButton>
    <ACollapse v-model="showing" class="mt-4">
      <p class="my-p">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum nisi cum
        asperiores magni blanditiis nostrum, nesciunt fuga ex mollitia veritatis
        aut dolorum ea! Cumque itaque perspiciatis culpa iste deleniti illo.
      </p>
    </ACollapse>

    <p class="mt-4">
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum nisi cum
      asperiores magni blanditiis nostrum, nesciunt fuga ex mollitia veritatis
      aut dolorum ea! Cumque itaque perspiciatis culpa iste deleniti illo.
    </p>
  </div>
</template>

<style scoped>
.my-p {
  border: 1px solid gray;
  padding: 22px;
  border-radius: 10px;
  background-color: aquamarine;
}
</style>
