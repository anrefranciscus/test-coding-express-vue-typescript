import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("token");

  if (to.name !== "LoginPage" && to.name !== 'RegisterPage' && !isAuthenticated) {
    next({ name: "LoginPage" });
  } else {
    next();
  }
});
app.use(router);

app.mount("#app");
