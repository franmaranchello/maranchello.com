import firebase from "firebase";
import { Project } from "@/types/project";
import "@firebase/firestore";
import "@firebase/storage";
import "@firebase/auth";

// This helper function pipes your types through a firestore converter
const converter = <T>() => ({
  toFirestore: (data: Partial<T>) => data,
  fromFirestore: (snap: firebase.firestore.QueryDocumentSnapshot) =>
    snap.data() as T,
});

// This helper function exposes a 'typed' version of firestore().collection(collectionPath)
// Pass it a collectionPath string as the path to the collection in firestore
// Pass it a type argument representing the 'type' (schema) of the docs in the collection
const dataPoint = <T>(collectionPath: string) =>
  firebase.firestore().collection(collectionPath).withConverter(converter<T>());

// Database helper object
const db = {
  projects: dataPoint<Project>("projects"),
};

// Export helper
export { db };
export default db;
