import { collection, doc, getDoc, getDocs, orderBy, query } from "firebase/firestore/lite";
import type { AboutContent } from "~/types/content";
import { getFirestoreDb, hasFirebaseConfig } from "~/utils/firebase";
import { projectFromDoc } from "~/utils/content";

export const fetchProjects = async () => {
  if (!hasFirebaseConfig()) return [];

  const snapshot = await getDocs(query(collection(getFirestoreDb(), "projects"), orderBy("date", "desc")));
  return snapshot.docs.map((project) => projectFromDoc(project.id, project.data()));
};

export const fetchProject = async (id: string) => {
  if (!hasFirebaseConfig()) return null;

  const snapshot = await getDoc(doc(getFirestoreDb(), "projects", id));
  return snapshot.exists() ? projectFromDoc(snapshot.id, snapshot.data()) : null;
};

export const fetchAbout = async (): Promise<AboutContent> => {
  if (!hasFirebaseConfig()) return { content: "" };

  const snapshot = await getDoc(doc(getFirestoreDb(), "general", "about"));
  return { content: String(snapshot.data()?.content || "") };
};

export const useProjects = async () => {
  const asyncData = await useAsyncData("projects", fetchProjects, { default: () => [] });

  if (import.meta.client && hasFirebaseConfig()) {
    await asyncData.refresh();
  }

  return asyncData;
};
