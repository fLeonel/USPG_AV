import { NoteRepositoryImpl } from "@/core/infra/repositories/fiebaseNotesRepository";
import { GetNotesByUser } from "@/usecases/notes/getNoteByUser";
import { UpdateNote } from "@/usecases/notes/updateNote";
import { DeleteNote } from "@/usecases/notes/deleteNote";
import { Note } from "@/core/domain/entities/notes";
import { CreateNote } from "@/usecases/notes/createNote";
import { GetNoteById } from "@/usecases/notes/getNoteById";

const repo = new NoteRepositoryImpl();

/**
 * Crea una nueva nota usando el caso de uso `CreateNote`.
 * 
 * @param note - Objeto `Note` que contiene los datos de la nota a crear.
 * @returns Una promesa que se resuelve con la nota creada.
 */
export const createNote = async (note: Note) => {
  const useCase = new CreateNote(repo);
  return await useCase.execute(note);
};

/**
 * Obtiene todas las notas de un usuario específico.
 * 
 * @param userId - ID del usuario.
 * @returns Una promesa que se resuelve con un array de notas del usuario.
 */
export const getNotesByUser = async (userId: string) => {
  const useCase = new GetNotesByUser(repo);
  return await useCase.execute(userId);
};

/**
 * Obtiene una nota por su ID.
 * 
 * @param noteId - ID de la nota a buscar.
 * @returns Una promesa que se resuelve con la nota encontrada o `null`.
 */
export const getNoteById = async (noteId: string) => {
  const useCase = new GetNoteById(repo);
  return await useCase.execute(noteId);
};

/**
 * Actualiza una nota existente.
 * 
 * @param note - Objeto `Note` con los datos actualizados.
 * @returns Una promesa que se resuelve con la nota actualizada.
 */
export const updateNote = async (note: Note) => {
  const useCase = new UpdateNote(repo);
  return await useCase.execute(note);
};

/**
 * Elimina una nota por su ID.
 * 
 * @param id - ID de la nota a eliminar.
 * @returns Una promesa que se resuelve cuando la nota ha sido eliminada.
 */
export const deleteNote = async (id: string) => {
  const useCase = new DeleteNote(repo);
  return await useCase.execute(id);
};
