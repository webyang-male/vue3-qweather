import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "@/assets/css/index.css";
import "@/assets/css/iconfont.css";
import 'remixicon/fonts/remixicon.css'
import "./style.css";


createApp(App).use(router).mount("#app");
