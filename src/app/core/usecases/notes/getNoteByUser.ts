import { Note } from "@/core/domain/entities/notes";
import { NoteRepository } from "@/core/domain/repositories/noteRepository";

export class GetNotesByUser {
  constructor(private readonly noteRepository: NoteRepository) {}

  async execute(userId: string): Promise<Note[]> {
    return await this.noteRepository.getAllByUser(userId);
  }
}
