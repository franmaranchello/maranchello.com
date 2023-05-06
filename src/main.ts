import dotenv from "dotenv";
dotenv.config();
import "./integrations/firebase";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import firebase from "firebase/app";
import VueMeta from "vue-meta";
import db from "./store/db";
import "firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

Vue.config.productionTip = false;
library.add(fas, far, fab);
Vue.component("font-awesome-icon", FontAwesomeIcon);

let app = new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");

firebase.auth().onAuthStateChanged(async (user) => {
  if (!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      render: (h) => h(App),
    }).$mount("#app");
  }
  if (user) {
    store.dispatch("fetchUserProfile", user);
  }
});

Vue.use(VueMeta);
