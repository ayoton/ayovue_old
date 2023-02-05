import { createRouter, createWebHistory } from "vue-router";

const ButtonPlayground = () => import("../ButtonPlayground.vue");
const InputPlayground = () => import("../InputPlayground.vue");
const SelectPlayground = () => import("../select/SelectPlayground.vue");
const MultiSelectPlayground = () => import("../multiselect/Playground.vue");
const SwitchPlayground = () => import("../SwitchPlayground.vue");
const DropdownPlayground = () => import("../DropdownPlayground.vue");
const DialogPlayground = () => import("../dialog/DialogPlayground.vue");

const routes = <any>[
  { path: "/dropdown", component: DropdownPlayground },
  { path: "/switch", component: SwitchPlayground },
  { path: "/button", component: ButtonPlayground },
  { path: "/input", component: InputPlayground },
  { path: "/select", component: SelectPlayground },
  { path: "/multi-select", component: MultiSelectPlayground },
  { path: "/dialog", component: DialogPlayground },
  { path: "/", component: ``, redirect: "/button" }
];

const router = createRouter({
  routes,
  history: createWebHistory(),
  scrollBehavior() {
    document.getElementById("main")?.scrollTo(0, 0);
  }
});

export default router;
