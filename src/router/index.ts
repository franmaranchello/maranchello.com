import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Menu from "../components/Menu.vue";
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
      menu: Menu,
    },
  },
  {
    path: "/home",
    name: "Home",
    components: {
      main: HomeView,
      menu: Menu,
    },
  },
  {
    path: "/about",
    name: "About",
    components: {
      main: AboutView,
      menu: Menu,
    },
  },
  {
    path: "/projects",
    name: "Projects",
    components: {
      main: ProjectGrid,
      menu: Menu,
    },
  },
  {
    path: "/blog",
    name: "Blog",
    components: {
      main: ProjectGrid,
      menu: Menu,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
