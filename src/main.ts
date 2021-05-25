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
import "firebase/auth";

Vue.config.productionTip = false;

let app: Vue;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      render: (h) => h(App),
    }).$mount("#app");
  }
});

Vue.use(VueMeta);
