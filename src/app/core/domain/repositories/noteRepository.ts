import { Note } from "@/core/domain/entities/notes";

export interface NoteRepository {
  create(note: Note): Promise<void>;
  update(note: Note): Promise<void>;
  delete(noteId: string): Promise<void>;
  getById(noteId: string): Promise<Note | null>;
  getAllByUser(userId: string): Promise<Note[]>;
}
