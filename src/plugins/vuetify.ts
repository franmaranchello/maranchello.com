import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
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
    },
  },
});
