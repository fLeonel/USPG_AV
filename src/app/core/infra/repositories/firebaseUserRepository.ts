import { User } from '@/app/domain/entities/user';
import { UserRepository } from '@/app/domain/repositories/userRepository';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';


export class FirebaseUserRepository implements UserRepository {
  async getUsers(): Promise<User[]> {
    const snapshot = await getDocs(collection(db, 'users'));
    return snapshot.docs.map(doc => User.fromJson(doc.id, doc.data()));
  }
}
