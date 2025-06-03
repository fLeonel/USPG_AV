import { Note } from "@/core/domain/entities/notes";
import { NoteRepository } from "@/core/domain/repositories/noteRepository";

/**
 * Caso de uso: Actualizar una nota existente.
 *
 * Esta clase encapsula la lógica para actualizar la información de una nota a través del repositorio correspondiente.
 */
export class UpdateNote {
  /**
   * Crea una instancia del caso de uso `UpdateNote`.
   *
   * @param noteRepository - Repositorio encargado de las operaciones relacionadas con notas.
   */
  constructor(private readonly noteRepository: NoteRepository) {}

  /**
   * Ejecuta el caso de uso para actualizar una nota.
   *
   * @param note - Objeto `Note` con los datos actualizados de la nota.
   * @returns Una promesa que se resuelve cuando la nota ha sido actualizada exitosamente.
   */
  async execute(note: Note): Promise<void> {
    await this.noteRepository.update(note);
  }
}
