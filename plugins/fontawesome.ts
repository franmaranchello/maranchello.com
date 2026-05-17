import { config, library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faGoogle,
  faInstagram,
  faLinkedin,
  faMedium,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";

config.autoAddCss = false;
library.add(faGithub, faGoogle, faInstagram, faLinkedin, faMedium, faMoon, faSun, faXTwitter);

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("FontAwesomeIcon", FontAwesomeIcon);
});
