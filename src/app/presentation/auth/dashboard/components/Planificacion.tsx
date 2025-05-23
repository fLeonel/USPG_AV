"use client";

import React, { useEffect, useState } from "react";
import {
  BsCalendarDay,
  BsCalendarCheck,
  BsCalendarX,
  BsCalendarWeek,
  BsPlus,
} from "react-icons/bs";

// Interfaz tarea
interface Tarea {
  id: number;
  titulo: string;
  fecha: string;
  completada: boolean;
  categoria?: string;
}

// Simulación de fetch de tareas (pendiente de implementar API)
async function obtenerTareas(): Promise<Tarea[]> {
  return [
    {
      id: 1,
      titulo: "Exponer el proyecto en la reunión de equipo",
      fecha: "2025-05-18",
      completada: false,
      categoria: "Tasks",
    },
    {
      id: 2,
      titulo: "Revisar el copy de la campaña de email",
      fecha: "2025-05-20",
      completada: false,
      categoria: "Campaign copy",
    },
    {
      id: 3,
      titulo: "Agregar el nuevo logo a la página de inicio",
      fecha: "2025-05-21",
      completada: false,
      categoria: "Newsletter",
    },
    {
      id: 5,
      titulo: "Revisar el diseño de la nueva landing page",
      fecha: "2025-05-23",
      completada: false,
      categoria: "Landing page",
    },
  ];
}

function esMismaFecha(f1: Date, f2: Date) {
  return (
    f1.getFullYear() === f2.getFullYear() &&
    f1.getMonth() === f2.getMonth() &&
    f1.getDate() === f2.getDate()
  );
}

function agruparTareas(tareas: Tarea[]): Record<string, Tarea[]> {
  const hoy = new Date();
  const mañana = new Date();
  mañana.setDate(hoy.getDate() + 1);

  return {
    Anteriormente: tareas.filter((t) => new Date(t.fecha) < hoy),
    Hoy: tareas.filter((t) => esMismaFecha(new Date(t.fecha), hoy)),
    Mañana: tareas.filter((t) => esMismaFecha(new Date(t.fecha), mañana)),
    Próximamente: tareas.filter((t) => new Date(t.fecha) > mañana),
  };
}

const iconosGrupo = {
  Anteriormente: <BsCalendarX className="text-red-500 mr-2" />,
  Hoy: <BsCalendarDay className="text-blue-500 mr-2" />,
  Mañana: <BsCalendarCheck className="text-green-500 mr-2" />,
  Próximamente: <BsCalendarWeek className="text-purple-500 mr-2" />,
} as const;

// Componente principal
export default function Planificacion() {
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [agrupadas, setAgrupadas] = useState<Record<string, Tarea[]>>({});
  const [nuevaTarea, setNuevaTarea] = useState("");
  const [fechaTarea, setFechaTarea] = useState("");
  const [categoriaTarea, setCategoriaTarea] = useState("");

  useEffect(() => {
    async function cargar() {
      const datos = await obtenerTareas();
      setTareas(datos);
      setAgrupadas(agruparTareas(datos));
    }
    cargar();
  }, []);

  const agregarTarea = () => {
    if (!nuevaTarea.trim() || !fechaTarea) return;

    const nueva: Tarea = {
      id: Date.now(), // ID temporal
      titulo: nuevaTarea,
      fecha: fechaTarea,
      completada: false,
      categoria: categoriaTarea || "Tasks",
    };

    const nuevasTareas = [...tareas, nueva];
    setTareas(nuevasTareas);
    setAgrupadas(agruparTareas(nuevasTareas));

    // Limpiar campos
    setNuevaTarea("");
    setFechaTarea("");
    setCategoriaTarea("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 pb-24">
      {" "}
      {/* Contenido existente de las tareas */}
      {Object.entries(agrupadas).map(([grupo, lista]) =>
        lista.length > 0 ? (
          <div key={grupo} className="mb-6">
            <div className="flex items-center mb-3">
              {iconosGrupo[grupo as keyof typeof iconosGrupo]}
              <h3 className="text-xl font-bold text-[#171717]">{grupo}</h3>
            </div>

            <div className="space-y-3">
              {lista.map((tarea) => (
                <div
                  key={tarea.id}
                  className="flex items-center justify-between bg-white border border-gray-200 rounded-xl shadow-sm p-4 transition hover:shadow-md"
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      className="mt-1 h-5 w-5 text-green-600 accent-green-600 cursor-pointer"
                      onChange={() => {
                        // lógica para completar la tarea
                      }}
                    />
                    <div>
                      <p
                        className={`font-medium ${
                          tarea.completada ? "line-through text-gray-400" : ""
                        }`}
                      >
                        {tarea.titulo}
                      </p>
                      <p className="text-sm text-gray-500">{tarea.categoria}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400 whitespace-nowrap">
                    {new Date(tarea.fecha).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : null
      )}
      {/* Input fijo para agregar nuevas tareas */}
      <div className="fixed bottom-0 left-65 right-0 bg-white border-t border-gray-200 py-4 px-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex gap-2">
          <input
            type="text"
            placeholder="Agrega una nueva tarea..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={nuevaTarea}
            onChange={(e) => setNuevaTarea(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && agregarTarea()}
          />
          <input
            type="date"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={fechaTarea}
            onChange={(e) => setFechaTarea(e.target.value)}
          />
          <input
            type="text"
            placeholder="Categoría"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-32"
            value={categoriaTarea}
            onChange={(e) => setCategoriaTarea(e.target.value)}
          />
          <button
            onClick={agregarTarea}
            className="bg-green-700 hover:bg-green-800 cursor-pointer text-white rounded-lg px-4 py-2 flex items-center gap-1 transition-colors"
          >
            <BsPlus size={20} />
            <span>Agregar</span>
          </button>
        </div>
      </div>
    </div>
  );
}
