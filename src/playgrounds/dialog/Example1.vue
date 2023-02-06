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

const showDialog = ref(false);
const anotherModal = ref(false);

const componentData = reactive({
  name: "ADialog",
  vModel: false,
  vModelRaw: "",
  booleanProps: {
    closeOnOutsideClick: false,
    hideHeader: false,
    hideFooter: false
  },
  stringProps: {
    width: "",
    heading: "Modal Heading"
  },

  numberProps: {},
  dropdownProps: {},
  variableProps: {}
});

const code = computed(() => {
  const slotData = `<p>
    This is modal content Lorem ...
  </p>
  <div class="mt-3">
    <AButton class="primary" @click="vModel = false">
      Yes
    </AButton>

    <AButton class="secondary ml-3" @click="vModel = false">
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
        <h2>Example 1</h2>
        <div class="playground__item mt-3">
          <AButton @click="componentData.vModel = true">Show Dialog</AButton>
          <ADialog
            v-model="componentData.vModel"
            :heading="componentData.stringProps.heading"
            :hide-header="componentData.booleanProps.hideHeader"
            :hide-footer="componentData.booleanProps.hideFooter"
            :close-on-outside-click="
              componentData.booleanProps.closeOnOutsideClick
            "
            :width="componentData.stringProps.width"
          >
            <p>
              This is modal content Lorem ipsum dolor sit, amet consectetur
              adipisicing elit. Voluptatem molestias nulla assumenda laudantium
              amet quo hic quia dolorem est itaque, cum quas qui facere magni
              inventore cupiditate quae expedita mollitia?
            </p>

            <div class="mt-3">
              <AButton class="primary" @click="componentData.vModel = false"
                >Yes</AButton
              >
              <AButton
                class="secondary ml-3"
                @click="componentData.vModel = false"
              >
                No</AButton
              >
            </div>
          </ADialog>

          <h4 class="mt-4">Props</h4>
          <BooleanProps :items="componentData.booleanProps"></BooleanProps>
          <StringProps :items="componentData.stringProps"></StringProps>
          <StringProps
            :items="componentData.numberProps"
            type="number"
          ></StringProps>
          <DropdownProps :items="componentData.dropdownProps"></DropdownProps>
        </div>
      </div>

      <div class="col-md-8">
        <AyoPrism :code="code" :fixed="true"></AyoPrism>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
