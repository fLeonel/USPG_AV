"use client";
import { CalendarDays } from "lucide-react";

const dias = [
  { fecha: "jue 15 de mayo", tareas: [] },
  { fecha: "vie 16 de mayo", tareas: ["terminar proyecto"] },
  { fecha: "sáb 17 de mayo", tareas: [] },
  { fecha: "dom 18 de mayo", tareas: [] },
  { fecha: "lun 19 de mayo", tareas: [] },
  { fecha: "mar 20 de mayo", tareas: [] },
];

export function Resume() {
  return (
    <div className="border border-black bg-[#88a699] p-8 rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-Black text-lg font-semibold">Tareas para los próximos 6 días</h2>
        <button className="flex items-center gap-1 text-white bg-[#2d4343] hover:bg-[#4a4a4a] px-3 py-1 rounded-md text-sm">
          <CalendarDays className="w-4 h-4" />
          Ver calendario
        </button>
      </div>

      <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {dias.map((dia, index) => (
          <div key={index} className="bg-[#2d4343] text-white rounded-md p-3">
            <p className="text-sm font-semibold mb-1">{dia.fecha}</p>
            {dia.tareas.length > 0 ? (
              dia.tareas.map((tarea, i) => (
                <p key={i} className="text-sm text-gray-300">{tarea}</p>
              ))
            ) : (
              <p className="text-sm text-gray-400 italic">No hay tareas</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}