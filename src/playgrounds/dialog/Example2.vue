<script lang="ts" setup>
import { ref, reactive, computed } from "vue";
import { generateComponentCode } from "../utils/functions";
import AButton from "../../components/AButton/index.vue";
import ADialog from "../../components/ADialog/index.vue";
import AyoPrism from "../code/AyoPrism.vue";
import BooleanProps from "../components/BooleanProps.vue";
import StringProps from "../components/StringProps.vue";
import DropdownProps from "../components/DropdownProps.vue";
import VariableProps from "../components/VariableProps.vue";

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
  const slotData = `<template #header="{ close }">
    <div
      class="d-flex jc-between ai-center"
      style="background: #e3e3e3; padding: 4px 16px"
    >
      <div class="flex-1 d-flex ai-center">
        <img src="/img/icons/q.png" alt="war" />
        <div class="px-2">Are you sure?</div>
      </div>
      <AButton icon @click="close" size="10" variant="danger">
        X
      </AButton>
    </div>
  </template>
  <p>
    This is modal content Lorem ipsum ...
  </p>

  <div class="py-3 d-flex jc-end">
    <AButton class="primary" @click="componentData.vModel = false">
      Yes
    </AButton>
    <AButton
      class="secondary ml-3"
      @click="componentData.vModel = false"
      variant="danger"
    >
      No
    </AButton>
  </div>`;
  return generateComponentCode(componentData, false, slotData);
});
</script>

<template>
  <div>
    <div class="row gap-0 mt-4">
      <div class="col-md-4">
        <h2>Example 2 with header slot</h2>
        <div class="playground__item mt-3">
          <AButton @click="componentData.vModel = true">Show Dialog</AButton>
          <ADialog
            v-model="componentData.vModel"
            :width="componentData.stringProps.width"
          >
            <template #header="{ close }">
              <div
                class="d-flex jc-between ai-center"
                style="background: #e3e3e3; padding: 4px 16px"
              >
                <div class="flex-1 d-flex ai-center">
                  <img src="/img/icons/q.png" alt="war" />
                  <div class="px-2">Are you sure?</div>
                </div>
                <AButton icon text @click="close" size="10" variant="danger">
                  X
                </AButton>
              </div>
            </template>
            <p>This is modal content Lorem ipsum dolor sit,?</p>

            <div class="py-3 d-flex jc-end">
              <AButton class="primary" @click="componentData.vModel = false">
                Yes
              </AButton>
              <AButton
                class="secondary ml-3"
                @click="componentData.vModel = false"
                variant="danger"
              >
                No
              </AButton>
            </div>
          </ADialog>
        </div>
      </div>

      <div class="col-md-8">
        <AyoPrism :code="code" :fixed="true"></AyoPrism>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
