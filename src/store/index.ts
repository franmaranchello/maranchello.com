import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase/app";
import "firebase/auth";
import db from "./db";
import { User } from "@/types/user";
import router from "@/router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userProfile: {} as User,
  },
  mutations: {
    setUserProfile(state, val) {
      state.userProfile = val;
    },
  },
  actions: {
    async login({ dispatch }, provider) {
      const { user } = await firebase.auth().signInWithPopup(provider);
      dispatch("fetchUserProfile", user);
    },
    async fetchUserProfile({ commit }, user) {
      const userProfile = await db.users.doc(user.uid).get();
      commit("setUserProfile", userProfile.data());
      router.push("/projects");
    },
    async signUp({ dispatch }, form) {
      const { user } = await firebase
        .auth()
        .createUserWithEmailAndPassword(form.email, form.password);
      const now = firebase.firestore.Timestamp.fromDate(new Date());
      await db.users.doc(user?.uid).set({
        name: form.name,
        lastName: form.lastName,
        type: "User",
        date: now,
        email: form.email,
      });
      dispatch("fetchUserProfile", user);
    },
  },
  modules: {},
});
