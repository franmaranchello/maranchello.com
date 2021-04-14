import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: true,
    themes: {
      dark: {
        primary: "#DF928E", // wheat EAD2AC
        secondary: "#EAD2AC", // ny pink
        accent: "#D1DEDE", // gainsboro
        error: "#C58882", // old rose
        info: "#1C1C1C", // dark background
        success: "#4CAF50",
        warning: "#FFC107",
      },
    },
  },
});
