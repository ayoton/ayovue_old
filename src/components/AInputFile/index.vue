<script lang="ts" setup>
/***
 * New Props: accept, capture
 */
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
  accept: stringProp,
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

const fileEL = ref<HTMLInputElement | null>(null);

const base64String = ref("");
const selectedFile: any = ref(null);
const blobURL = ref("");
const fileName = ref("");
const fileSize: any = ref("");

function handleChange(e: Event) {
  const targetElement: any = e.target;
  if (!targetElement.files[0]) {
    return;
  }

  selectFile(targetElement?.files[0]);
}

function selectFile(file: File) {
  // console.log(targetElement?.files[0]);
  selectedFile.value = file;

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

  if (fileType.value === "image") {
    blobURL.value = URL.createObjectURL(selectedFile.value);
  }
}

function resetFile() {
  selectedFile.value = null;
  blobURL.value = "";
  fileName.value = "";
}

function openFileDialog() {
  console.log(fileEL.value);
  let el = document.querySelector("#" + props.name);
  console.log(el);
}

const fileType = computed(() => {
  if (!selectedFile.value) {
    return "";
  }

  return selectedFile.value.type.split("/")[0];
});

const fileExtension = computed(() => {
  if (!selectedFile.value) {
    return "";
  }

  var re = /(?:\.([^.]+))?$/;

  const arr = re.exec(selectedFile.value.name);
  if (arr) {
    return arr[1];
  }
  return "";
});

function handleDrop(e: DragEvent) {
  e.preventDefault();
  const file = e.dataTransfer?.files[0];
  // console.log(file);

  selectFile(file!!);
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
    @dragover.prevent
    @drop="handleDrop"
  >
    <input
      :id="name"
      :name="name"
      type="file"
      class="a-file__input"
      @change="handleChange"
      ref="fileEl"
      :accept="accept"
      capture
    />
    <label class="a-file__label" :for="name" v-if="!selectedFile">
      <div class="a-file__upload-icon a-icon-upload"></div>
      <div class="mt-1">Drag & Drop files here</div>
    </label>

    <img
      v-else-if="fileType === 'image'"
      :src="blobURL"
      alt=""
      class="a-file__image-preview"
    />

    <div
      v-else
      class="a-file__common-preview d-flex jc-center ai-center fd-column"
    >
      <div class="a-icon-file a-file__thumbnail"></div>
      <div>
        {{ fileName }}
      </div>
      <div class="a-cf__size">
        {{ fileSize }}
      </div>
    </div>

    <div
      v-if="selectedFile"
      class="a-file__hover"
      :class="{ 'a-file__hover--forced': fileType !== 'image' }"
    >
      <div class="a-file__hover-header">
        <label
          class="a-icon-pencil"
          @click="openFileDialog"
          :for="name"
        ></label>
        <div
          class="a-icon-close a-file__close"
          click="resetFile"
          style="cursor: pointer"
          @click="resetFile"
        ></div>
      </div>

      <div class="a-file__hover-footer" v-if="fileType === 'image'">
        <span>{{ fileName }} ({{ selectedFile.type }})</span>
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
  position: absolute;
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
  padding: 9px 2px;
}

.a-file__hover--forced {
  opacity: 1;
  background: none;
  color: var(--a-c-gray-400);
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

.a-file__close:hover {
  color: var(--a-c-red-200);
}

.a-file__common-preview {
  position: absolute;
  left: 6px;
  top: 6px;
  right: 6px;
  bottom: 6px;
  padding: 0.5em 1em;
  background-color: var(--a-c-gray-50);

  font-size: 1em;
  color: var(--a-c-gray-600);
}

.a-fc__left {
  /* primary/primary-400 */

  border: 2px solid var(--a-c-primary-400);
  border-radius: 4px;
  padding: 33px;
  font-weight: 700;
  font-size: 1em;
  color: var(--a-c-primary-400);
  text-transform: uppercase;
}

.a-fc__middle {
  flex: 1;
  padding: 0 11px;
}

.a-fc__right {
}

.a-cf__size {
  color: var(--a-c-gray-400);
}

.a-file__thumbnail {
  font-size: 55px;
  color: var(--a-c-gray-400);
}
</style>
