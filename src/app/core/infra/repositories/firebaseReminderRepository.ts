import {
  collection,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  getDocs,
  query,
  where,
  Timestamp,
} from "firebase/firestore";
import { Reminders } from "@/core/domain/entities/reminders";
import { ReminderRepository } from "@/core/domain/repositories/reminderRepository";
import { db } from "@/core/infra/firebase/firebase";

const remindersCollection = collection(db, "reminders");

type ReminderDoc = {
  title: string;
  date: Date | Timestamp;
  isCompleted: boolean;
  user_id: string;
};

export class ReminderRepositoryImpl implements ReminderRepository {
  async create(reminder: Reminders): Promise<void> {
    const ref = doc(remindersCollection, reminder.id);
    await setDoc(ref, reminder.toJson());
  }

  async update(reminder: Reminders): Promise<void> {
    const ref = doc(remindersCollection, reminder.id);
    await setDoc(ref, reminder.toJson(), { merge: true });
  }

  async delete(id: string): Promise<void> {
    const ref = doc(remindersCollection, id);
    await deleteDoc(ref);
  }

  async getByUser(userId: string): Promise<Reminders[]> {
    if (!userId) throw new Error("El usuario es inválido o undefined");

    const q = query(remindersCollection, where("user_id", "==", userId));
    const snap = await getDocs(q);

    return snap.docs.map((d) =>
      Reminders.fromJson(d.id, d.data() as ReminderDoc),
    );
  }

  async getById(id: string): Promise<Reminders | null> {
    const ref = doc(remindersCollection, id);
    const snap = await getDoc(ref);

    return snap.exists()
      ? Reminders.fromJson(snap.id, snap.data() as ReminderDoc)
      : null;
  }
}
