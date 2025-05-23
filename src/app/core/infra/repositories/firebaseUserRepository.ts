import { User } from "@/domain/entities/user";
import { UserRepository } from "@/domain/repositories/userRepository";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export class FirebaseUserRepository implements UserRepository {
  async getUsers(): Promise<User[]> {
    const snapshot = await getDocs(collection(db, "users"));
    return snapshot.docs.map((doc) => User.fromJson(doc.id, doc.data()));
  }

  async signInWithGoogle(): Promise<User> {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const firebaseUser = result.user;

    const userRef = doc(db, "users", firebaseUser.uid);
    const snapshot = await getDoc(userRef);

    let user: User;

    if (!snapshot.exists()) {
      user = new User(
        firebaseUser.uid,
        "Sin carrera",
        new Date(),
        0,
        firebaseUser.displayName ?? "",
        firebaseUser.email ?? "",
        firebaseUser.photoURL ?? "",
      );

      await setDoc(userRef, {
        carrera: user.carrera,
        createAt: serverTimestamp(),
        edad: user.edad,
        name: user.name,
        email: user.email,
        user_pic: user.user_pic,
      });
    } else {
      user = User.fromJson(firebaseUser.uid, snapshot.data()!);
    }

    return user;
  }

  async create(user: User): Promise<void> {
    const userRef = doc(db, "users", user.id);
    await setDoc(userRef, {
      carrera: user.carrera,
      createAt: serverTimestamp(),
      edad: user.edad,
      name: user.name,
      email: user.email,
      user_pic: user.user_pic,
    });
  }
}
