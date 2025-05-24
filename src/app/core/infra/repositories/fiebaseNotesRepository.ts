import { Note } from "@/core/domain/entities/notes";
import { NoteRepository } from "@/core/domain/repositories/noteRepository";
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

const db = getFirestore();
const notesCollection = collection(db, "notes");

export class NoteRepositoryImpl implements NoteRepository {
  async create(note: Note): Promise<void> {
    const noteDoc = doc(notesCollection, note.id);
    await setDoc(noteDoc, note.toJson());
  }

  async update(note: Note): Promise<void> {
    const noteDoc = doc(notesCollection, note.id);
    await setDoc(noteDoc, note.toJson(), { merge: true });
  }

  async delete(noteId: string): Promise<void> {
    const noteDoc = doc(notesCollection, noteId);
    await deleteDoc(noteDoc);
  }

  async getById(noteId: string): Promise<Note | null> {
    const noteDoc = doc(notesCollection, noteId);
    const snapshot = await getDoc(noteDoc);

    if (!snapshot.exists()) return null;

    return Note.fromJson(snapshot.id, snapshot.data()!);
  }

  async getAllByUser(userId: string): Promise<Note[]> {
    const q = query(notesCollection, where("user_id", "==", userId));
    const snapshot = await getDocs(q);

    return snapshot.docs.map((docSnap) =>
      Note.fromJson(docSnap.id, docSnap.data()),
    );
  }
}
