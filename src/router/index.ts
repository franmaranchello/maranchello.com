import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import VueGtag from "vue-gtag";
import firebase from "firebase/app";
import "firebase/auth";
import Menu from "../components/Menu.vue";
import HomeView from "../views/HomeView.vue";
import Browse from "../components/browse/Browse.vue";
import AboutView from "../views/AboutView.vue";
import Login from "../components/Login.vue";
import BlogView from "../views/BlogView.vue";
import Admin from "../components/admin/Admin.vue";
import ManagePosts from "../components/admin/ManagePosts.vue";
import ManageProjects from "../components/admin/ManageProjects.vue";

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
      main: BlogView,
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
  {
    path: "/admin",
    name: "Admin",
    components: {
      main: Admin,
      menu: Menu,
    },
    meta: {
      authRequired: true,
    },
  },
  {
    path: "/admin/projects",
    name: "AdminProjects",
    components: {
      main: ManageProjects,
      menu: Menu,
    },
    meta: {
      authRequired: true,
    },
  },
  {
    path: "/admin/posts",
    name: "AdminPosts",
    components: {
      main: ManagePosts,
      menu: Menu,
    },
    meta: {
      authRequired: true,
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

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.authRequired)) {
    if (firebase.auth().currentUser?.uid == "MwMTQwq0D9av2NEyDoTi05w3XRU2") {
      next();
    } else {
      alert("You're not an admin!");
      next(from.fullPath);
    }
  } else {
    next();
  }
});

Vue.use(
  VueGtag,
  {
    config: { id: "G-0X5P47WPCF" },
    appName: "maranchello-website",
    pageTrackerScreenviewEnabled: true,
  },
  router
);

export default router;
