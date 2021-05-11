import firebase from "firebase/app";

export interface Post {
  name: string;
  date: firebase.firestore.Timestamp;
  tags: string[];
  description: string;
  content: string;
  gallery: string[];
}
