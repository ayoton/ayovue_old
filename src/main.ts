import { createApp } from "vue";
import App from "./App.vue";
import "../public/themes/default/all.css";
import router from "./playgrounds/routes";

createApp(App).use(router).mount("#app");


// configure pinia store
