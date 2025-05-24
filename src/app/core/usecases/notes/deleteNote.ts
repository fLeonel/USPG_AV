import { NoteRepository } from "@/core/domain/repositories/noteRepository";

export class DeleteNote {
  constructor(private readonly noteRepository: NoteRepository) {}

  async execute(noteId: string): Promise<void> {
    await this.noteRepository.delete(noteId);
  }
}
