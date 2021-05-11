import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase/app";
import "firebase/auth";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userData: {},
  },
  mutations: {
    setUserData(state, val) {
      state.userData = val;
    },
  },
  actions: {
    getUserData({ commit }, user) {
      commit("setUserData", user);
    },
  },
  modules: {},
});
