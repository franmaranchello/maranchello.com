import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ProjectGrid from "../views/ProjectGrid.vue";
import AboutView from "../views/AboutView.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "home",
    components: {
      main: HomeView,
    },
  },
  {
    path: "/about",
    name: "about",
    components: {
      main: AboutView,
    },
  },
  {
    path: "/projects",
    name: "projects",
    components: {
      main: ProjectGrid,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
