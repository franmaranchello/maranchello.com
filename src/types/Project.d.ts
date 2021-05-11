import firebase from "firebase/app";

export interface Project {
  name: string;
  type: string;
  date: firebase.firestore.Timestamp;
  tags: string[];
  collection: string;
  description: string;
  content: string;
  gallery: firebase.storage.Reference[];
}
