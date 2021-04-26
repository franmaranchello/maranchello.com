import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Menu from "../components/Menu.vue";
import HomeView from "../views/HomeView.vue";
import Browse from "../components/browse/Browse.vue";
import AboutView from "../views/AboutView.vue";
import Login from "../components/Login.vue";

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
      menu: Menu,
    },
  },
  {
    path: "/projects",
    name: "Projects",
    components: {
      main: Browse,
      menu: Menu,
    },
  },
  {
    path: "/blog",
    name: "Blog",
    components: {
      main: Browse,
      menu: Menu,
    },
  },
  {
    path: "/login",
    name: "Login",
    components: {
      main: Login,
      menu: Menu,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

const DEFAULT_TITLE = "Francisco Maranchello";
router.afterEach((to, _from) => {
  Vue.nextTick(() => {
    document.title = to.meta.title || DEFAULT_TITLE;
  });
});

export default router;
