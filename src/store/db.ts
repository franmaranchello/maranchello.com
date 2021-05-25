import firebase from "firebase";
import { Project } from "@/types/project";
import { Post } from "@/types/post";
import { User } from "@/types/user";
import "@firebase/firestore";
import "@firebase/storage";
import "@firebase/auth";

// This helper function pipes custom types through a firestore converter
const converter = <T>() => ({
  toFirestore: (data: Partial<T>) => data,
  fromFirestore: (snap: firebase.firestore.QueryDocumentSnapshot) =>
    snap.data() as T,
});

// This helper function exposes a 'typed' version of firestore().collection(collectionPath)
// Receives a collectionPath string as the path to the collection in firestore
// Receives a type argument representing the 'type' (schema) of the docs in the collection
const dataPoint = <T>(collectionPath: string) =>
  firebase.firestore().collection(collectionPath).withConverter(converter<T>());

// Database helper object
const db = {
  projects: dataPoint<Project>("projects"),
  posts: dataPoint<Post>("posts"),
  general: dataPoint<any>("general"),
  users: dataPoint<User>("users"),
};

// Export helper
export { db };
export default db;
