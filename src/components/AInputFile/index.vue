<script lang="ts" setup>
import { computed, ref } from "vue";
import {
  variantProp,
  sizeProp,
  booleanProp,
  stringProp,
  widthProp,
  aspectRatioProp,
  nameProp
} from "../proptypes/";

const props = defineProps({
  variant: variantProp,
  size: sizeProp,
  outlined: booleanProp,
  raised: booleanProp,
  rounded: booleanProp,
  fileType: stringProp,
  width: widthProp,
  aspectRatio: aspectRatioProp,
  name: nameProp
});

const classes = computed(() => {
  return {
    "a-file": true,
    [`a-${props.variant}`]: true,
    "a-outlined": props.outlined
    // "a-raised": props.raised,
    // "a-rounded": props.rounded,
    // "a-flat": props.flat,
    // "a-text": props.text,
    // "a-icon": props.icon,
    // "a-block": props.block
  };
});

const base64String = ref("");
const selectedFile: any = ref(null);
const blobURL = ref("");
const fileName = ref("");
const fileSize: any = ref("");

function handleChange(e: Event) {
  const targetElement: any = e.target;
  // console.log(targetElement?.files[0]);
  selectedFile.value = targetElement?.files[0];
  blobURL.value = URL.createObjectURL(selectedFile.value);
  fileName.value =
    selectedFile.value.name.length < 20
      ? selectedFile.value.name
      : "..." + selectedFile.value.name.slice(-17);

  fileSize.value = Math.ceil(selectedFile.value.size / 1024);

  if (fileSize.value > 1024) {
    fileSize.value = Math.ceil(fileSize.value / 1024) + "MB";
  } else {
    fileSize.value = fileSize.value + "KB";
  }
}

function resetFile() {
  selectedFile.value = null;
  blobURL.value = "";
  fileName.value = "";
}
</script>

<template>
  <div
    class=""
    :class="classes"
    :style="{
      '--a-font-size': `${size}px`,
      width: width,
      aspectRatio: aspectRatio
    }"
  >
    <label class="a-file__label" :for="name" v-if="!selectedFile">
      <div class="a-file__upload-icon a-icon-upload"></div>
      <div class="mt-1">Drag & Drop files here</div>
      <input
        :id="name"
        :name="name"
        type="file"
        class="a-file__input"
        @change="handleChange"
      />
    </label>

    <img
      v-else-if="selectedFile.type === 'image/jpeg'"
      :src="blobURL"
      alt=""
      class="a-file__image-preview"
    />

    <div v-if="selectedFile" class="a-file__hover">
      <div class="a-file__hover-header">
        <span>E</span>
        <span @click="resetFile" style="cursor: pointer">X</span>
      </div>

      <div class="a-file__hover-footer">
        <span>{{ fileName }}</span>
        <span>{{ fileSize }}</span>
      </div>
    </div>
  </div>
</template>

<style>
.a-file {
  /* border: 1px dotted gray; */
  /* border: 1px dashed black; */
  position: relative;
  border: 2px dashed var(--a-c-gray-400);
  border-spacing: 16px;
  border-radius: 4px;
  padding: 5px;
}

.a-file:hover {
  border-color: var(--a-c-gray-500);
}

.a-file__label {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var(--a-c-gray-600);
  cursor: pointer;
}

.a-file__input {
  visibility: hidden;
  width: 0;
}

.a-file__upload-icon {
  color: var(--a-c-gray-400);
  font-size: 48px;
}

.a-file__image-preview {
  max-width: 100%;
  display: block;
}

.a-file__hover {
  position: absolute;
  top: 6px;
  left: 6px;
  right: 6px;
  bottom: 6px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.3);
  color: #fff;
  opacity: 0;
  transition: all 0.2s;
}

.a-file__hover:hover {
  opacity: 1;
}

.a-file__hover-header,
.a-file__hover-footer {
  display: flex;
  justify-content: space-between;
  padding: 0 5px;
}
</style>
