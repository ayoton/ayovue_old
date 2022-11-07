import { reactive } from "vue";

export const colors = [
  "",
  "primary",
  "secondary",
  "danger",
  "warning",
  "info",
  "success"
];

export const sizes = ["", "sm", "md", "lg", "xl", "xxl"];

interface AT {
  [key: string]: boolean;
}

export const buttonStates = reactive<AT>({
  outlined: false,
  raised: false,
  rounded: false,
  flat: false,
  text: false,
  icon: false,
  loading: false,
  block: false
});
