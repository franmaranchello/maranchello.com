import { firebase } from "@firebase/app";
import "@firebase/firestore";
import "@firebase/storage";
// import "@firebase/auth";
// import "@firebase/functions";

const config = {
  apiKey: process.env.VUE_APP_APIKEY,
  authDomain: process.env.VUE_APP_AUTHDOMAIN,
  projectId: process.env.VUE_APP_PROJECTID,
  storageBucket: process.env.VUE_APP_STORAGEBUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGINGSENDERID,
  appId: process.env.VUE_APP_APPID,
  measurementId: process.env.VUE_APP_MEASUREMENTID,
};

firebase.initializeApp(config);

// ! this will tell firestore to look at local emulator
// if (location.hostname === "localhost") {
//   firestore.settings({
//     host: "localhost:8080",
//     ssl: false,
//   });
// }

export const firestore = firebase.firestore();
export const storage = firebase.storage();
export default firebase;
// export const auth = firebase.auth();
// export const functions = firebase.functions();
