import { reactive } from "vue"

export const variants = [
  "",
  "primary",
  "secondary",
  "danger",
  "warning",
  "info",
  "success",
]

export const sizes = ["", "sm", "md", "lg", "xl", "xxl"]

interface AT {
  [key: string]: boolean
}

export const buttonStates = reactive<AT>({
  outlined: false,
  raised: false,
  rounded: false,
  flat: false,
  text: false,
  icon: false,
  loading: false,
  block: false,
  disabled: false,
})

export const inputTypes = reactive([
  { type: "text", vModel: "" },
  { type: "number", vModel: "" },
  { type: "email", vModel: "" },
  { type: "password", vModel: "" },
  { type: "search", vModel: "" },
  { type: "url", vModel: "" },
  { type: "tel", vModel: "" },
  { type: "date", vModel: "" },
  { type: "time", vModel: "" },
  { type: "range", vModel: "" },
  { type: "color", vModel: "" },
])

export const inputStates = [
  { name: "No State", value: null },
  {
    name: "Info State",
    value: "info",
    stateText: "Must include at least 3 characters",
  },
  { name: "Warning State", value: "warning" },
  { name: "Success State", value: "success" },
  {
    name: "Danger State",
    value: "danger",
  },
]
