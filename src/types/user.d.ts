import firebase from "firebase/app";

export interface User {
  name: string;
  lastName: string;
  type: string;
  date: firebase.firestore.Timestamp;
  email: string;
}
