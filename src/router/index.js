import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CobaView from "../views/CobaView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/coba",
      name: "coba",
      component: CobaView,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
      };
    }
  },
});

export default router;
