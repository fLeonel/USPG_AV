import { Note } from "@/core/domain/entities/notes";
import { NoteRepository } from "@/core/domain/repositories/noteRepository";

export class CreateNote {
  constructor(private readonly noteRepository: NoteRepository) {}

  async execute(note: Note): Promise<void> {
    if (!note.id || typeof note.id !== "string" || note.id.trim() === "") {
      throw new Error("Invalid note ID");
    }

    if (!note.title || note.title.trim() === "") {
      throw new Error("Title is required");
    }

    await this.noteRepository.create(note);
  }
}
