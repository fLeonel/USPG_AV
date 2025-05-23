'use client';

import { useState } from 'react';
import NoteList from './components/NoteList';
import SidebarLayout from '../auth/components/sidebarLayout';

interface Note {
  id: number;
  title: string;
  summary: string;
  createdAt: Date;
}

export default function HomePage() {
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  return (
    <SidebarLayout>

      {/* Lista de notas */}
      <NoteList onNoteSelect={setSelectedNote} />

      {/* Detalle de nota */}
      <section className="flex-1 p-6 bg-gray-50">
        {selectedNote ? (
          <>
            <div className="flex justify-between mb-2">
              <h2 className="text-2xl font-semibold">{selectedNote.title}</h2>
              <span className="text-sm text-gray-500">
                Fecha de creación: {selectedNote.createdAt.toDateString()}
              </span>
            </div>
            <p className="text-gray-700 text-lg">{selectedNote.summary}</p>
          </>
        ) : (
          <p className="text-gray-500">Selecciona una nota para verla.</p>
        )}
      </section>
    </SidebarLayout>
  );
}
