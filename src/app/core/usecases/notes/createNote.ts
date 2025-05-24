import { Note } from "@/core/domain/entities/notes";
import { NoteRepository } from "@/core/domain/repositories/noteRepository";

export class CreateNote {
  constructor(private readonly noteRepository: NoteRepository) {}

  async execute(note: Note): Promise<void> {
    await this.noteRepository.create(note);
  }
}
