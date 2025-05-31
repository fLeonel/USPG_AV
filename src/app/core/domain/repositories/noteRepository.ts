import { Note } from "@/core/domain/entities/notes";

/**
 * Define las operaciones del repositorio para gestionar notas de usuario.
 */
export interface NoteRepository {
  /**
   * Crea una nueva nota en el sistema.
   *
   * @param note - La nota a crear.
   * @returns Una promesa que se resuelve cuando la operación finaliza.
   */
  create(note: Note): Promise<void>;
  /**
   * Actualiza una nota existente en el sistema.
   *
   * @param note - La nota con los datos actualizados.
   * @returns Una promesa que se resuelve cuando la operación finaliza.
   */
  update(note: Note): Promise<void>;
  /**
   * Elimina una nota del sistema.
   *
   * @param noteId - El ID de la nota a eliminar.
   * @returns Una promesa que se resuelve cuando la operación finaliza.
   */
  delete(noteId: string): Promise<void>;
  /**
   * Obtiene una nota por su ID.
   *
   * @param noteId - El ID de la nota a obtener.
   * @returns Una promesa que resuelve con la nota encontrada o null si no existe.
   */
  getById(noteId: string): Promise<Note | null>;
  /**
   * Obtiene todas las notas de un usuario.
   *
   * @param userId - El ID del usuario cuyas notas se desean obtener.
   * @returns Una promesa que resuelve con un array de notas del usuario.
   */
  getAllByUser(userId: string): Promise<Note[]>;
}
