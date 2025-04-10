import { AuthRepository } from "@/core/domain/repositories/authRepository";
import { User } from "@/core/domain/entities/user";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

export class FirebaseAuthRepository implements AuthRepository {
  async registerWithEmail(
    email: string,
    password: string,
    data: Omit<User, "id" | "createAt">,
  ): Promise<User> {
    const auth = getAuth();
    const db = getFirestore();

    const cred = await createUserWithEmailAndPassword(auth, email, password);
    const firebaseUser = cred.user;

    const userData = {
      ...data,
      email: firebaseUser.email ?? "",
      createAt: new Date(),
    };

    const ref = doc(db, "users", firebaseUser.uid);
    await setDoc(ref, userData);

    return new User(
      firebaseUser.uid,
      userData.carrera,
      userData.createAt,
      userData.edad,
      userData.name,
      userData.email,
      userData.user_pic,
    );
  }
}
