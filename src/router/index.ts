import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ProjectGrid from "../views/ProjectGrid.vue";
import AboutView from "../views/AboutView.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    components: {
      main: HomeView,
    },
  },
  {
    path: "/home",
    name: "Home",
    components: {
      main: HomeView,
    },
  },
  {
    path: "/about",
    name: "About",
    components: {
      main: AboutView,
    },
  },
  {
    path: "/projects",
    name: "Projects",
    components: {
      main: ProjectGrid,
    },
  },
  {
    path: "/blog",
    name: "Blog",
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
