<script lang="ts" setup>
import { reactive, computed } from "vue";
import { generateComponentCode } from "../utils/functions";
import AButton from "../../components/AButton/index.vue";
import ADialog from "../../components/ADialog/index.vue";
import AyoPrism from "../code/AyoPrism.vue";

const componentData = reactive({
  name: "ADialog",
  vModel: false,
  vModelRaw: "",
  booleanProps: {},
  stringProps: {
    width: "500px"
  },

  numberProps: {},
  dropdownProps: {},
  variableProps: {}
});

const code = computed(() => {
  const slotData = `<template #default>
    <p v-for="i in 40">
      Lorem ipsum dolor sit amet ...
    </p>
  </template>
  <template #footer="{ close }">
    <div
      class="p-3 text-right d-flex jc-between"
      style="background: #f5f5f5"
    >
      <AButton @click="close" variant="success"> I Agree </AButton>
      <AButton @click="close" variant="danger"> Cancel </AButton>
    </div>
  </template>`;
  return generateComponentCode(componentData, false, slotData);
});
</script>

<template>
  <div>
    <div class="row gap-0 mt-4">
      <div class="col-md-5">
        <h2>Example 2 with footer slot</h2>
        <div class="playground__item mt-3">
          <AButton @click="componentData.vModel = true">Show Dialog</AButton>
          <ADialog
            v-model="componentData.vModel"
            :width="componentData.stringProps.width"
            title="License Agreement"
          >
            <template #default>
              <p v-for="i in 40">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
                alias, amet esse doloribus dolore aperiam dolorem dolor omnis
                earum illo nemo debitis quidem saepe repudiandae error deleniti
                eveniet quod enim?
              </p>
            </template>
            <template #footer="{ close }">
              <div
                class="p-3 text-right d-flex jc-between"
                style="background: #f5f5f5"
              >
                <AButton @click="close" variant="success"> I Agree </AButton>
                <AButton @click="close" variant="danger"> Cancel </AButton>
              </div>
            </template>
          </ADialog>
        </div>
      </div>

      <div class="col-md-7">
        <AyoPrism :code="code" :fixed="true"></AyoPrism>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
