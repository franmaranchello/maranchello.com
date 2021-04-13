import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
    dark: false,
        themes: {
          dark: {
            primary: "#86BCC2", // k hov color
            secondary: "#272727", // medium gray
            accent: "#ffa012", // orange
            error: "#B71C1C",
            info: "#1C1C1C", // dark background
            success: "#4CAF50",
            warning: "#FFC107",
          },
          light: {
            primary: "#86BCC2", // k hov color
            secondary: "#272727", // medium gray
            accent: "#ffa012", // orange
            error: "#B71C1C",
            info: "#F8F8F8", // dark background
            success: "#4CAF50",
            warning: "#FFC107",
          }
        },
      },
});
