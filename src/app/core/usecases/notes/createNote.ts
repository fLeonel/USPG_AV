import { Note } from "@/core/domain/entities/notes";
import { NoteRepository } from "@/core/domain/repositories/noteRepository";

/**
 * Caso de uso: Crear una nueva nota.
 *
 * Esta clase encapsula la lógica para crear una nota utilizando el repositorio correspondiente.
 */
export class CreateNote {
  /**
   * Crea una nueva instancia del caso de uso `CreateNote`.
   *
   * @param noteRepository - Repositorio de notas que maneja la lógica de creación de notas.
   */
  constructor(private readonly noteRepository: NoteRepository) {}

  /**
   * Ejecuta el caso de uso para crear una nueva nota.
   *
   * @param note - Objeto `Note` que contiene la información de la nota a crear.
   * @returns Una promesa que se resuelve cuando la nota ha sido creada exitosamente.
   */
  async execute(note: Note): Promise<void> {
    await this.noteRepository.create(note);
  }
}
