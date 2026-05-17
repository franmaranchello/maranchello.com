import { collection, doc, getDoc, getDocs, orderBy, query } from "firebase/firestore/lite";
import type { AboutContent } from "~/types/content";
import { getFirestoreDb, hasFirebaseConfig } from "~/utils/firebase";
import { postFromDoc, projectFromDoc } from "~/utils/content";

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

export const fetchPosts = async () => {
  if (!hasFirebaseConfig()) return [];

  const snapshot = await getDocs(query(collection(getFirestoreDb(), "posts"), orderBy("date", "desc")));
  return snapshot.docs.map((post) => postFromDoc(post.id, post.data()));
};

export const fetchPost = async (id: string) => {
  if (!hasFirebaseConfig()) return null;

  const snapshot = await getDoc(doc(getFirestoreDb(), "posts", id));
  return snapshot.exists() ? postFromDoc(snapshot.id, snapshot.data()) : null;
};

export const fetchAbout = async (): Promise<AboutContent> => {
  if (!hasFirebaseConfig()) return { content: "" };

  const snapshot = await getDoc(doc(getFirestoreDb(), "general", "about"));
  return { content: String(snapshot.data()?.content || "") };
};

export const useProjects = () => useAsyncData("projects", fetchProjects, { default: () => [] });

export const usePosts = () => useAsyncData("posts", fetchPosts, { default: () => [] });
