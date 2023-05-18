import { createRouter, createWebHistory } from "vue-router";

const ButtonPlayground = () => import("../ButtonPlayground.vue");
const InputPlayground = () => import("../InputPlayground.vue");
const SelectPlayground = () => import("../select/SelectPlayground.vue");
const MultiSelectPlayground = () => import("../multiselect/Playground.vue");
const SwitchPlayground = () => import("../SwitchPlayground.vue");
const DropdownPlayground = () => import("../DropdownPlayground.vue");
const DialogPlayground = () => import("../dialog/DialogPlayground.vue");
const ToastPLayground = () => import("../toast/ToastPlayground.vue");
const TooltipPlayground = () => import("../TooltipPlayground.vue");
const InputFilePlayground = () =>
  import("../inputfile/InputFilePlayground.vue");
const CollapsePlayground = () => import("../collapse/CollapsePlayground.vue");

const routes = <any>[
  { path: "/", component: ``, redirect: "/button" },
  { path: "/dropdown", component: DropdownPlayground },
  { path: "/switch", component: SwitchPlayground },
  { path: "/button", component: ButtonPlayground },
  { path: "/input", component: InputPlayground },
  { path: "/select", component: SelectPlayground },
  { path: "/multi-select", component: MultiSelectPlayground },
  { path: "/dialog", component: DialogPlayground },
  { path: "/toast", component: ToastPLayground },
  { path: "/tooltip", component: TooltipPlayground },
  { path: "/input-file", component: InputFilePlayground },
  { path: "/collapse", component: CollapsePlayground }
];

const router = createRouter({
  routes,
  history: createWebHistory(),
  scrollBehavior() {
    document.getElementById("main")?.scrollTo(0, 0);
  }
});

export default router;
