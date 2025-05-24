import { Note } from "@/core/domain/entities/notes";
import { NoteRepository } from "@/core/domain/repositories/noteRepository";

export class UpdateNote {
  constructor(private readonly noteRepository: NoteRepository) {}

  async execute(note: Note): Promise<void> {
    await this.noteRepository.update(note);
  }
}
