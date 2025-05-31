"use client";

import { useEffect, useState } from "react";
import NoteList from "./components/NoteList";
import { Note as DomainNote } from "@/core/domain/entities/notes";
import {
  getNotesByUser,
  createNote,
  deleteNote,
} from "@/core/services/noteService";
import { NoteEditor } from "./components/NoteEditor";
import { getAuth } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";

export default function NotesPage() {
  const [notes, setNotes] = useState<DomainNote[]>([]);
  const [selectedNote, setSelectedNote] = useState<DomainNote | null>(null);

  useEffect(() => {
    const fetchNotes = async () => {
      const auth = getAuth();
      const userId = auth.currentUser?.uid || "user_test";
      const data = await getNotesByUser(userId);
      setNotes(data);
    };

    fetchNotes();
  }, []);

  const handleCreateNote = async () => {
    const auth = getAuth();
    const userId = auth.currentUser?.uid;
    if (!userId) return;

    const now = new Date();
    const newNote = new DomainNote(
      uuidv4(),
      userId,
      "",
      "",
      false,
      [],
      now,
      now,
    );

    await createNote(newNote);
    setNotes((prev) => [...prev, newNote]);
    setSelectedNote(newNote);
  };

  const handleUpdateNote = (updated: DomainNote) => {
    setNotes((prev) =>
      prev.map((note) => (note.id === updated.id ? updated : note)),
    );
    setSelectedNote(updated);
  };

  const handleSelectNote = (note: DomainNote) => {
    setSelectedNote(note);
  };

  const handleDeleteNote = async (id: string) => {
    try {
      const confirmDelete = confirm("¿Seguro que quieres eliminar esta nota?");
      if (!confirmDelete) return;

      await deleteNote(id);
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));

      if (selectedNote?.id === id) {
        setSelectedNote(null);
      }

      alert("Nota eliminada correctamente.");
    } catch (error) {
      console.error("Error al eliminar la nota:", error);
      alert("No se pudo eliminar la nota.");
    }
  };

  return (
    <div className="flex h-full">
      {/* Panel izquierdo: lista */}
      <NoteList
        notes={notes}
        onNoteSelect={handleSelectNote}
        onCreateNote={handleCreateNote}
        onDeleteNote={handleDeleteNote}
      />

      {/* Panel derecho: editor */}
      <section className="flex-1 p-6 bg-gray-50 overflow-y-auto">
        {selectedNote ? (
          <NoteEditor note={selectedNote} onUpdate={handleUpdateNote} />
        ) : (
          <p className="text-gray-500 italic">
            Selecciona una nota para verla.
          </p>
        )}
      </section>
    </div>
  );
}
