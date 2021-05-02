import { firebase } from "@firebase/app";
import "@firebase/firestore";
import "@firebase/storage";
import "@firebase/auth";
import { Project } from "@/types/project";
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

const projectCollection = firebase.firestore().collection("projects");

export const store = {
  projectFeed: [{}],
  currentUser: null,
  createProject: async (project: Project) => {
    try {
      return projectCollection.add(project);
    } catch (e) {
      return console.error("error inserting", project, e);
    }
  },
};

projectCollection.orderBy("name", "desc").onSnapshot(() => {
  const projects: any[] = [];
  projects.forEach((item) => {
    const project = item.data();
    project.id = item.id;
    projects.push(project);
  });
  console.log("project feed: ", projects);
  store.projectFeed = projects;
});

// firebase.auth().onAuthStateChanged((user) => {
//   store.currentUser = user;
// });

export default firebase;
