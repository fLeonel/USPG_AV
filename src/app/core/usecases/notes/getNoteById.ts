import { Note } from "@/core/domain/entities/notes";
import { NoteRepository } from "@/core/domain/repositories/noteRepository";

/**
 * Caso de uso: Obtener una nota por su ID.
 *
 * Esta clase encapsula la lógica para recuperar una nota específica mediante su identificador.
 */
export class GetNoteById {
  /**
   * Crea una instancia del caso de uso GetNoteById.
   * @param noteRepository - Repositorio de notas para acceder a los datos.
   */
  constructor(private readonly noteRepository: NoteRepository) {}

  /**
   * Ejecuta el caso de uso para obtener una nota según su ID.
   *
   * @param noteId - ID de la nota que se desea obtener.
   * @returns Una promesa que resuelve con la nota si se encuentra, o `null` si no existe.
   */
  async execute(noteId: string): Promise<Note | null> {
    return await this.noteRepository.getById(noteId);
  }
}
