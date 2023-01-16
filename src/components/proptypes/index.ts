import type { PropType } from "vue";

type allowedInputTypes =
  | "text"
  | "number"
  | "email"
  | "password"
  | "search"
  | "url"
  | "tel"
  | "date"
  | "time"
  | "range"
  | "color"
  | string;
export const inputTypeProp = {
  type: String as PropType<allowedInputTypes>,
  default: "text",
  validator(value: string) {
    return [
      "",
      "text",
      "number",
      "email",
      "password",
      "search",
      "url",
      "tel",
      "date",
      "time",
      "range",
      "color"
    ].includes(value);
  }
};

export const sizeProp = {
  type: [String, Number],
  default: 16
};

export const stringProp = {
  type: String,
  default: ""
};

export const nameProp = {
  type: String,
  default: `input-` + Math.ceil(Math.random() * 100000)
};

export const stringOrNumberProp = {
  type: [String, Number],
  default: ""
};

export const booleanProp = {
  type: Boolean,
  default: false
};

export const anyProp = {
  type: [String, Array, Object, Number, Date, Boolean],
  default: ""
};

export const anyArrayProp = {
  type: Array<any>,
  default: []
};

export const labelFieldProp = {
  type: String,
  default: "name"
};

export const valueFieldProp = {
  type: String,
  default: "value"
};

type allowedStates = "info" | "success" | "warning" | "danger" | "";
export const stateProp = {
  type: String as PropType<allowedStates>,
  default: "",
  validator(value: string) {
    return ["", "info", "success", "warning", "danger"].includes(value);
  }
};

export const widthProp = {
  type: String,
  default: "100%"
};

type allowedColors =
  | "primary"
  | "secondary"
  | "danger"
  | "warning"
  | "info"
  | "success"
  | string;

export const variantProp = {
  type: String as PropType<allowedColors>,
  default: "primary",
  validator(value: string) {
    return [
      "",
      "primary",
      "secondary",
      "warning",
      "danger",
      "success",
      "info"
    ].includes(value);
  }
};
