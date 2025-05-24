import { NoteRepositoryImpl } from "@/infra/repositories/fiebaseNotesRepository";
import { GetNotesByUser } from "@/usecases/notes/getNoteByUser";
import { UpdateNote } from "@/usecases/notes/updateNote";
import { DeleteNote } from "@/usecases/notes/deleteNote";
import { Note } from "@/core/domain/entities/notes";
import { CreateNote } from "@/usecases/notes/createNote";
import { GetNoteById } from "@/usecases/notes/getNoteById";

const repo = new NoteRepositoryImpl();

export const createNote = async (note: Note) => {
  const useCase = new CreateNote(repo);
  return await useCase.execute(note);
};

export const getNotesByUser = async (userId: string) => {
  const useCase = new GetNotesByUser(repo);
  return await useCase.execute(userId);
};

export const getNoteById = async (noteId: string) => {
  const useCase = new GetNoteById(repo);
  return await useCase.execute(noteId);
};

export const updateNote = async (note: Note) => {
  const useCase = new UpdateNote(repo);
  return await useCase.execute(note);
};

export const deleteNote = async (id: string) => {
  const useCase = new DeleteNote(repo);
  return await useCase.execute(id);
};
