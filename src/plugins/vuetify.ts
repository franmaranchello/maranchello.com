import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import { TiptapVuetifyPlugin } from "tiptap-vuetify";
import "tiptap-vuetify/dist/main.css";

Vue.use(Vuetify);

const vuetify = new Vuetify({
  theme: {
    dark: true,
    themes: {
      dark: {
        primary: "#3F51B5", //indigo
        secondary: "#CDDC39", //lime
        accent: "#673AB7", //deep purple
        error: "#F44336", //red
        info: "#FF5722", //deep orange
        success: "#8BC34A", //light green
        warning: "#F44336", //red
        background: "0D1117", //blue grey
      },
      light: {
        primary: "#FEA82F",
        secondary: "#424242",
        accent: "#82B1FF",
        error: "#FF5252",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FFC107",
      },
    },
  },
});

Vue.use(TiptapVuetifyPlugin, {
  vuetify: vuetify,
  iconsGroup: "mdi",
});

export default vuetify;
