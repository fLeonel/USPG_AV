"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

export default function Calendario() {
  const tareas = [
    {
      title: "Reunión con el equipo",
      date: "2025-05-23",
      category: "Trabajo",
      estado: "Pendiente",
    },
    {
      title: "Entrega de proyecto",
      date: "2025-05-23",
      category: "Universidad",
      estado: "Completado",
    },
    {
      title: "Pago de servicios",
      date: "2025-05-26",
      category: "Personal",
      estado: "Pendiente",
    },
  ];

  return (
    <div className="p-8 bg-gray-100 min-h-screen overflow-auto">
      {/* Grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Lista de tareas a la izquierda */}
        <div className="lg:col-span-1">
          <h2 className="text-2xl font-semibold mb-4">Tareas programadas</h2>
          <div className="space-y-4">
            {tareas.map((tarea, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-white rounded-xl shadow px-6 py-4 hover:shadow-md transition-all"
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {tarea.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    📅 {tarea.date} · 🏷️ {tarea.category}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    tarea.estado === "Completado"
                      ? "bg-green-200 text-green-800"
                      : "bg-yellow-200 text-yellow-800"
                  }`}
                >
                  {tarea.estado}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Calendario a la derecha, ocupando más espacio */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow h-fit">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={tareas.map((t) => ({
              title: t.title,
              date: t.date,
            }))}
            height="auto"
          />
        </div>
      </div>
    </div>
  );
}
