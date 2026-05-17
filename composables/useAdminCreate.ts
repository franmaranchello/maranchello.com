import { addDoc, arrayUnion, collection, getFirestore, updateDoc, doc, Timestamp } from "firebase/firestore";
import { getDownloadURL, getStorage, ref as storageRef, uploadBytes } from "firebase/storage";
import { getFirebaseApp } from "~/utils/firebase";

interface CreateProjectInput {
  name: string;
  type: string;
  date: string;
  tags: string[];
  collection: string;
  description: string;
  content: string;
  files: File[];
}

interface CreatePostInput {
  name: string;
  date: string;
  tags: string[];
  description: string;
  content: string;
  files: File[];
}

const sortFiles = (files: File[]) =>
  [...files].sort((a, b) =>
    a.name.localeCompare(navigator.languages[0] || navigator.language, undefined, {
      ignorePunctuation: true,
      numeric: true,
    })
  );

const uploadGallery = async (basePath: string, docId: string, files: File[]) => {
  const storage = getStorage(getFirebaseApp());
  const uploadedUrls: string[] = [];

  for (const file of sortFiles(files)) {
    const fileRef = storageRef(storage, `${basePath}/${docId}/${file.name}`);
    const upload = await uploadBytes(fileRef, file);
    uploadedUrls.push(await getDownloadURL(upload.ref));
  }

  return uploadedUrls;
};

export const createProject = async (input: CreateProjectInput) => {
  const db = getFirestore(getFirebaseApp());
  const projectRef = await addDoc(collection(db, "projects"), {
    name: input.name,
    type: input.type,
    date: Timestamp.fromDate(new Date(input.date)),
    tags: input.tags,
    collection: input.collection,
    description: input.description,
    content: input.content,
    gallery: [],
  });

  const gallery = await uploadGallery("project-assets", projectRef.id, input.files);

  if (gallery.length) {
    await updateDoc(doc(db, "projects", projectRef.id), {
      gallery: arrayUnion(...gallery),
    });
  }

  return projectRef.id;
};

export const createPost = async (input: CreatePostInput) => {
  const db = getFirestore(getFirebaseApp());
  const postRef = await addDoc(collection(db, "posts"), {
    name: input.name,
    date: Timestamp.fromDate(new Date(input.date)),
    tags: input.tags,
    description: input.description,
    content: input.content,
    gallery: [],
  });

  const gallery = await uploadGallery("post-assets", postRef.id, input.files);

  if (gallery.length) {
    await updateDoc(doc(db, "posts", postRef.id), {
      gallery: arrayUnion(...gallery),
    });
  }

  return postRef.id;
};
