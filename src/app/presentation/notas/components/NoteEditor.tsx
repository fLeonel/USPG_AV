import { useEffect, useState } from "react";
import { Note } from "@/core/domain/entities/notes";
import { updateNote } from "@/core/services/noteService";
import { CheckIcon } from "lucide-react"; // si usás lucide

interface Props {
  note: Note;
  onUpdate?: (updatedNote: Note) => void;
}

export function NoteEditor({ note, onUpdate }: Props) {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setTitle(note.title);
    setContent(note.content);
  }, [note.id]);

  const handleSave = async () => {
    setIsSaving(true);
    const updated = new Note(
      note.id,
      note.userId,
      title,
      content,
      note.isPinned,
      note.tags,
      note.createdAt,
      new Date(),
    );

    await updateNote(updated);
    setIsSaving(false);
    setSaved(true);
    onUpdate?.(updated);

    // Feedback por 2 segundos
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <input
          className="text-2xl font-bold border-none outline-none bg-transparent w-full"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="flex items-center gap-2">
          {saved && <CheckIcon className="text-green-600" size={20} />}
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {isSaving ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </div>

      <textarea
        className="flex-grow border-none outline-none bg-transparent resize-none"
        placeholder="Escribí tu nota..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
    </div>
  );
}
