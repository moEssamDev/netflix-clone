import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getFirestore, doc, setDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBlVFGR1HmX88N33Pt8Xm2jQguAhcRzubU",
  authDomain: "netflix-clone-4b622.firebaseapp.com",
  projectId: "netflix-clone-4b622",
  storageBucket: "netflix-clone-4b622.appspot.com",
  messagingSenderId: "843549634171",
  appId: "1:843549634171:web:be50ac8ce94d0e3d45bcde",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await setDoc(doc(db, "user", user.uid), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (error) {
    console.log(error);
    toast.error(error);
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
    toast(error.code.split("/")[1].split("-").join(" "));
  }
};

const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.log(error);
    toast(error.code.split("/")[1].split("-").join(" "));
  }
};

export { auth, db, login, signup, logout };
