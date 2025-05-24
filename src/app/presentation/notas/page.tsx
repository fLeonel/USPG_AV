"use client";

import { useEffect, useState } from "react";
import NoteList from "./components/NoteList";
import SidebarLayout from "../auth/components/sidebarLayout";
import { Note as DomainNote } from "@/core/domain/entities/notes";
import {
  getNotesByUser,
  createNote,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateNote,
} from "@/core/services/noteService";
import { NoteEditor } from "./components/NoteEditor";
import { getAuth } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";

export default function NotesPage() {
  const [notes, setNotes] = useState<DomainNote[]>([]);
  const [selectedNote, setSelectedNote] = useState<DomainNote | null>(null);

  // 🔄 Cargar notas al iniciar
  useEffect(() => {
    const fetchNotes = async () => {
      const auth = getAuth();
      const userId = auth.currentUser?.uid || "user_test";
      const data = await getNotesByUser(userId);
      setNotes(data);
    };

    fetchNotes();
  }, []);

  // ➕ Crear una nueva nota
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

  // ✅ Actualizar una nota después de guardar
  const handleUpdateNote = (updated: DomainNote) => {
    setNotes((prev) =>
      prev.map((note) => (note.id === updated.id ? updated : note)),
    );
    setSelectedNote(updated);
  };

  // 🖱️ Seleccionar una nota para editarla
  const handleSelectNote = (note: DomainNote) => {
    setSelectedNote(note);
  };

  return (
    <SidebarLayout>
      {/* Panel izquierdo: lista */}
      <NoteList
        notes={notes}
        onNoteSelect={handleSelectNote}
        onCreateNote={handleCreateNote}
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
    </SidebarLayout>
  );
}
