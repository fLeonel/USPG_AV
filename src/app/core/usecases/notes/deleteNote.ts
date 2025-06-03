import { NoteRepository } from "@/core/domain/repositories/noteRepository";

/**
 * Caso de uso: Eliminar una nota existente.
 *
 * Esta clase encapsula la lógica para eliminar una nota a través del repositorio correspondiente.
 */
export class DeleteNote {
  /**
   * Crea una instancia del caso de uso DeleteNote.
   * @param noteRepository - Repositorio de notas para interactuar con la fuente de datos.
   */
  constructor(private readonly noteRepository: NoteRepository) {}

  /**
   * Ejecuta el caso de uso para eliminar una nota por su ID.
   *
   * @param noteId - ID de la nota que se desea eliminar.
   * @returns Una promesa que se resuelve cuando la nota ha sido eliminada exitosamente.
   */
  async execute(noteId: string): Promise<void> {
    await this.noteRepository.delete(noteId);
  }
}
