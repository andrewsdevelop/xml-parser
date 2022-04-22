import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      name: "login",
      path: "/login",
      component: () => import("@/pages/LoginPage.vue"),
    },
    {
      name: "home",
      path: "/home",
      component: () => import("@/pages/HomePage.vue"),
    },
  ],
});

export default router;
