'use client';

import React, { useState } from 'react';
import { PencilIcon, TrashIcon, PlusIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Note {
  id: number;
  title: string;
  summary: string;
  createdAt: Date;
}

type SortOrder = 'recent' | 'oldest';

interface NoteListProps {
  onNoteSelect: (note: Note) => void;
  onCreateNote?: () => void; // <- NUEVO: función opcional para crear una nota
}

const initialNotes: Note[] = [
  {
    id: 1,
    title: 'Primera nota',
    summary: 'Esta es la primera prueba de notas para ver cómo funciona...',
    createdAt: new Date('2024-01-01'),
  },
  {
    id: 2,
    title: 'Nota importante',
    summary: 'Esta nota contiene información relevante del proyecto...',
    createdAt: new Date('2024-03-15'),
  },
];

export default function NoteList({ onNoteSelect, onCreateNote }: NoteListProps) {
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState<SortOrder>('recent');
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const router = useRouter();


  const filteredNotes = notes
    .filter((note) =>
      note.title.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) =>
      sortOrder === 'recent'
        ? b.createdAt.getTime() - a.createdAt.getTime()
        : a.createdAt.getTime() - b.createdAt.getTime()
    );

  const handleDelete = (id: number) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <div className="flex h-screen bg-gray-200 rounded-xl overflow-hidden shadow-md">
      {/* Panel izquierdo de notas */}
      <div className="w-1/3 p-4 bg-secondary rounded-l-xl shadow-sm overflow-y-auto">
        {/* Encabezado: título y botón "+" */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Notas</h2>
          <button
            onClick={() => router.push('#')} //aqui va la parte para enlazar a la pantalla de crear nota
            className="flex items-center justify-center p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition"

            title="Crear nueva nota"
          >
            <PlusIcon size={20} />
          </button>
        </div>

        {/* Filtro */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Buscar nota..."
            className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="flex justify-between mt-2 text-sm">
            <span>Orden:</span>
            <select
              className="px-2 py-1 rounded border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as SortOrder)}
            >
              <option value="recent">Reciente</option>
              <option value="oldest">Antigua</option>
            </select>
          </div>
        </div>

        {/* Lista de notas */}
        <ul className="space-y-3">
          {filteredNotes.map((note, index) => (
            <li
              key={note.id}
              className={`p-3 rounded-xl cursor-pointer transition shadow-sm ${
                index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-50'
              } hover:bg-gray-200`}
              onClick={() => onNoteSelect(note)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-800">{note.title}</h3>
                  <p className="text-sm text-gray-600">
                    {note.summary.slice(0, 50)}...
                  </p>
                </div>
                <div className="flex gap-2 mt-1">
                  <button className="text-blue-500 hover:text-blue-700">
                    <PencilIcon size={18} />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(note.id);
                    }}
                  >
                    <TrashIcon size={18} />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Panel derecho (contenido de nota seleccionado o pantalla en blanco) */}
      <div className="w-2/3 p-6 bg-gray-100 rounded-r-xl flex items-center justify-center text-gray-500 text-lg italic">
        Selecciona una nota para ver el contenido...
      </div>
    </div>
  );
}
