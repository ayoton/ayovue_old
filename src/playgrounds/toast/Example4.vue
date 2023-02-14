<script lang="ts" setup>
import { reactive, computed, ref } from "vue";
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
  const slotData = `<p>First dialog content</p>
  <AButton
    @click="dialogTwoVModel = true"
    variant="success"
    class="my-3"
  >
    Show another dialog
  </AButton>

  <ADialog
    v-model="dialogTwoVModel"
    width="200px"
    title="Second Dialog"
  >
    <p>
      This is second dialog content. You can open as many dialog as
      you want recursively
    </p>
  </ADialog>`;
  return generateComponentCode(componentData, false, slotData);
});

const dialogTwoVModel = ref(false);
</script>

<template>
  <div>
    <div class="row gap-0 mt-4">
      <div class="col-md-5">
        <h2>Dialog in Dialog</h2>
        <div class="playground__item mt-3">
          <AButton @click="componentData.vModel = true">Show Dialog</AButton>
          <ADialog
            v-model="componentData.vModel"
            :width="componentData.stringProps.width"
            title="First Dialog"
          >
            <p>First dialog content</p>
            <AButton
              @click="dialogTwoVModel = true"
              variant="success"
              class="my-3"
            >
              Show another dialog
            </AButton>

            <ADialog
              v-model="dialogTwoVModel"
              width="200px"
              title="Second Dialog"
            >
              <p>
                This is second dialog content. You can open as many dialog as
                you want recursively
              </p>
            </ADialog>
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
