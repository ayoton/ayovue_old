import { createRouter, createWebHistory } from "vue-router";

const ButtonPlayground = () => import("../ButtonPlayground.vue");
const InputPlayground = () => import("../InputPlayground.vue");

const routes = <any>[
  { path: "/button", component: ButtonPlayground },
  { path: "/input", component: InputPlayground },
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
