import { arrayUnion, collection, doc, getFirestore, setDoc, Timestamp, updateDoc } from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref as storageRef,
  uploadBytes,
  type StorageReference,
} from "firebase/storage";
import { getFirebaseApp, getFirebaseConfig } from "~/utils/firebase";

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

export const sortFilesByName = (files: File[]) =>
  [...files].sort((a, b) =>
    a.name.localeCompare(b.name, navigator.languages[0] || navigator.language, {
      ignorePunctuation: true,
      numeric: true,
    })
  );

const assertStorageBucket = () => {
  if (!getFirebaseConfig().storageBucket) {
    throw new Error("Firebase storage bucket is missing from the public runtime config.");
  }
};

const uploadGallery = async (basePath: string, docId: string, files: File[]) => {
  if (!files.length) return [];

  assertStorageBucket();

  const storage = getStorage(getFirebaseApp());
  const uploadedUrls: string[] = [];
  const uploadedRefs: StorageReference[] = [];

  try {
    for (const file of sortFilesByName(files)) {
      const fileRef = storageRef(storage, `${basePath}/${docId}/${file.name}`);
      const upload = await uploadBytes(fileRef, file);
      uploadedRefs.push(upload.ref);
      uploadedUrls.push(await getDownloadURL(upload.ref));
    }
  } catch (error) {
    await Promise.allSettled(uploadedRefs.map((fileRef) => deleteObject(fileRef)));
    throw error;
  }

  return uploadedUrls;
};

export const createProject = async (input: CreateProjectInput) => {
  const db = getFirestore(getFirebaseApp());
  const projectRef = doc(collection(db, "projects"));
  const gallery = await uploadGallery("project-assets", projectRef.id, input.files);

  await setDoc(projectRef, {
    name: input.name,
    type: input.type,
    date: Timestamp.fromDate(new Date(input.date)),
    tags: input.tags,
    collection: input.collection,
    description: input.description,
    content: input.content,
    gallery,
  });

  return projectRef.id;
};

export const appendProjectGallery = async (projectId: string, files: File[]) => {
  const trimmedProjectId = projectId.trim();

  if (!trimmedProjectId) {
    throw new Error("Project ID is required.");
  }

  const gallery = await uploadGallery("project-assets", trimmedProjectId, files);

  if (!gallery.length) return [];

  const db = getFirestore(getFirebaseApp());
  await updateDoc(doc(db, "projects", trimmedProjectId), {
    gallery: arrayUnion(...gallery),
  });

  return gallery;
};
