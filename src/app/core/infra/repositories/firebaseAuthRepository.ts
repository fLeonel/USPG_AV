import { AuthRepository } from "@/core/domain/repositories/authRepository";
import { User } from "@/core/domain/entities/user";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { auth, db } from "@/core/infra/firebase/firebase";

export class FirebaseAuthRepository implements AuthRepository {
  async registerWithEmail(
    email: string,
    password: string,
    data: Omit<User, "id" | "createAt">,
  ): Promise<User> {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    const firebaseUser = cred.user;

    const userData = {
      ...data,
      email: firebaseUser.email ?? "",
      createAt: Timestamp.fromDate(new Date()),
    };

    const ref = doc(db, "users", firebaseUser.uid);
    await setDoc(ref, userData);

    return new User(
      firebaseUser.uid,
      userData.carrera,
      userData.createAt.toDate(),
      userData.edad,
      userData.name,
      userData.email,
      userData.user_pic,
    );
  }
}

export const authRepository = new FirebaseAuthRepository();
