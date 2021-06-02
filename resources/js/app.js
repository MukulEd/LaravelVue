require("./bootstrap");

import { createApp } from "vue";
import App from "../views/App.vue";
import router from "./router";
import store from "./store";
// const app = createApp({
//     components: {
//         App,
//     },
// });

// app.mount("#app");
const app = createApp(App);
app.use(router);
app.use(store);
app.mount("#app");
// createApp(App).use([router, store]).mount("#app");
