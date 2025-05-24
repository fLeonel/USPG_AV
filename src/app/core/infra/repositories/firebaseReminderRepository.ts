import {
  collection,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { Reminder } from "@/core/domain/entities/reminders";
import { ReminderRepository } from "@/core/domain/repositories/reminderRepository";
import { db } from "@/core/infra/firebase/firebase";

const remindersCollection = collection(db, "reminders");

export class ReminderRepositoryImpl implements ReminderRepository {
  async create(reminder: Reminder): Promise<void> {
    const ref = doc(remindersCollection, reminder.id);
    await setDoc(ref, reminder.toJson());
  }

  async update(reminder: Reminder): Promise<void> {
    const ref = doc(remindersCollection, reminder.id);
    await setDoc(ref, reminder.toJson(), { merge: true });
  }

  async delete(id: string): Promise<void> {
    const ref = doc(remindersCollection, id);
    await deleteDoc(ref);
  }

  async getByUser(userId: string): Promise<Reminder[]> {
    const q = query(remindersCollection, where("user_id", "==", userId));
    const snap = await getDocs(q);
    return snap.docs.map((d) => Reminder.fromJson(d.id, d.data()));
  }

  async getById(id: string): Promise<Reminder | null> {
    const ref = doc(remindersCollection, id);
    const snap = await getDoc(ref);
    return snap.exists() ? Reminder.fromJson(snap.id, snap.data()) : null;
  }
}
