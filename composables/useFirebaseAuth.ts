import type { User } from "firebase/auth";
import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { getFirebaseApp, hasFirebaseConfig } from "~/utils/firebase";

const ADMIN_UID = "MwMTQwq0D9av2NEyDoTi05w3XRU2";

export const useFirebaseAuth = () => {
  const user = useState<User | null>("firebase-user", () => null);
  const ready = useState("firebase-auth-ready", () => false);

  const init = () => {
    if (!import.meta.client || ready.value || !hasFirebaseConfig()) return;

    onAuthStateChanged(getAuth(getFirebaseApp()), (authUser) => {
      user.value = authUser;
      ready.value = true;
    });
  };

  const loginWithGoogle = async () => {
    if (!import.meta.client) return;

    const provider = new GoogleAuthProvider();
    const credentials = await signInWithPopup(getAuth(getFirebaseApp()), provider);
    user.value = credentials.user;
    ready.value = true;
  };

  const logout = async () => {
    if (!import.meta.client) return;

    await signOut(getAuth(getFirebaseApp()));
    user.value = null;
  };

  const isAdmin = computed(() => user.value?.uid === ADMIN_UID);

  return {
    init,
    isAdmin,
    loginWithGoogle,
    logout,
    ready,
    user,
  };
};
