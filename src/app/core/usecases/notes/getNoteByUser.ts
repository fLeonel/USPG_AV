import { Note } from "@/core/domain/entities/notes";
import { NoteRepository } from "@/core/domain/repositories/noteRepository";

/**
 * Caso de uso: Obtener todas las notas de un usuario específico.
 *
 * Esta clase encapsula la lógica para recuperar todas las notas asociadas a un usuario.
 */
export class GetNotesByUser {
  /**
   * Crea una instancia del caso de uso `GetNotesByUser`.
   *
   * @param noteRepository - Repositorio encargado de las operaciones relacionadas con notas.
   */
  constructor(private readonly noteRepository: NoteRepository) {}

  /**
   * Ejecuta el caso de uso para obtener todas las notas de un usuario dado.
   *
   * @param userId - ID del usuario cuyas notas se desean obtener.
   * @returns Una promesa que resuelve con un arreglo de notas del usuario.
   */
  async execute(userId: string): Promise<Note[]> {
    return await this.noteRepository.getAllByUser(userId);
  }
}
