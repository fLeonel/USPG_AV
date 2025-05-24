import { Note } from "@/core/domain/entities/notes";
import { NoteRepository } from "@/core/domain/repositories/noteRepository";

export class GetNoteById {
  constructor(private readonly noteRepository: NoteRepository) {}

  async execute(noteId: string): Promise<Note | null> {
    return await this.noteRepository.getById(noteId);
  }
}
