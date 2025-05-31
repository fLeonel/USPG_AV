"use client";

import React, { useEffect, useState } from "react";
import {
  BsCalendarDay,
  BsCalendarCheck,
  BsCalendarX,
  BsCalendarWeek,
  BsPlus,
} from "react-icons/bs";
import {
  getRemindersByUser,
  createReminder,
  updateReminder,
} from "@/core/services/reminderService";
import { Reminders } from "@/core/domain/entities/reminders";
import { getAuth } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";

interface Tarea {
  id: string;
  titulo: string;
  fecha: string;
  completada: boolean;
  categoria: string;
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
    Anteriormente: tareas.filter(
      (t) => new Date(t.fecha) < hoy && !t.completada,
    ),
    Hoy: tareas.filter(
      (t) => esMismaFecha(new Date(t.fecha), hoy) && !t.completada,
    ),
    Mañana: tareas.filter(
      (t) => esMismaFecha(new Date(t.fecha), mañana) && !t.completada,
    ),
    Próximamente: tareas.filter(
      (t) => new Date(t.fecha) > mañana && !t.completada,
    ),
    Completadas: tareas.filter((t) => t.completada),
  };
}

const iconosGrupo = {
  Anteriormente: <BsCalendarX className="text-red-500 mr-2" />,
  Hoy: <BsCalendarDay className="text-blue-500 mr-2" />,
  Mañana: <BsCalendarCheck className="text-green-500 mr-2" />,
  Próximamente: <BsCalendarWeek className="text-purple-500 mr-2" />,
  Completadas: <BsCalendarCheck className="text-gray-400 mr-2" />,
} as const;

export default function Planificacion() {
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [agrupadas, setAgrupadas] = useState<Record<string, Tarea[]>>({});
  const [nuevaTarea, setNuevaTarea] = useState("");
  const [fechaTarea, setFechaTarea] = useState("");
  const [categoriaTarea, setCategoriaTarea] = useState("");

  const auth = getAuth();
  const userId = auth.currentUser?.uid;

  useEffect(() => {
    async function cargar() {
      if (!userId) return;

      const datos: Reminders[] = await getRemindersByUser(userId);
      const formateadas: Tarea[] = datos.map((r) => ({
        id: r.id,
        titulo: r.title,
        fecha: r.date.toISOString(),
        completada: r.isCompleted,
        categoria: r.category,
      }));

      setTareas(formateadas);
      setAgrupadas(agruparTareas(formateadas));
    }

    cargar();
  }, [userId]);

  const agregarTarea = async () => {
    if (!nuevaTarea.trim() || !fechaTarea || !userId) return;

    const reminder = new Reminders(
      uuidv4(),
      nuevaTarea,
      new Date(fechaTarea),
      false,
      userId,
      categoriaTarea || "General",
    );

    try {
      await createReminder(reminder);

      const nueva: Tarea = {
        id: reminder.id,
        titulo: reminder.title,
        fecha: reminder.date.toISOString(),
        completada: false,
        categoria: reminder.category,
      };

      const nuevasTareas = [...tareas, nueva];
      setTareas(nuevasTareas);
      setAgrupadas(agruparTareas(nuevasTareas));

      setNuevaTarea("");
      setFechaTarea("");
      setCategoriaTarea("");
    } catch (err) {
      console.error("Error al crear reminder:", err);
      alert("Error al guardar la tarea.");
    }
  };

  const marcarComoCompletada = async (id: string) => {
    const tarea = tareas.find((t) => t.id === id);
    if (!tarea || !userId) return;

    const updatedReminder = new Reminders(
      tarea.id,
      tarea.titulo,
      new Date(tarea.fecha),
      true,
      userId,
      tarea.categoria,
    );

    try {
      await updateReminder(updatedReminder);

      const nuevasTareas = tareas.map((t) =>
        t.id === id ? { ...t, completada: true } : t,
      );
      setTareas(nuevasTareas);
      setAgrupadas(agruparTareas(nuevasTareas));
    } catch (err) {
      console.error("Error al completar tarea:", err);
      alert("No se pudo completar la tarea.");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 pb-24">
      {/* 🟡 Mostrar tareas activas agrupadas */}
      {Object.entries(agrupadas).map(([grupo, lista]) =>
        grupo !== "Completadas" && lista.length > 0 ? (
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
                      checked={tarea.completada}
                      className="mt-1 h-5 w-5 text-green-600 accent-green-600 cursor-pointer"
                      onChange={() => marcarComoCompletada(tarea.id)}
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
        ) : null,
      )}

      {/* ✅ Panel de tareas completadas */}
      {agrupadas.Completadas?.length > 0 && (
        <div className="mt-10 border-t pt-6">
          <div className="flex items-center mb-3">
            {iconosGrupo["Completadas"]}
            <h3 className="text-xl font-bold text-gray-600">Completadas</h3>
          </div>
          <div className="space-y-3">
            {agrupadas.Completadas.map((tarea) => (
              <div
                key={tarea.id}
                className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl p-4"
              >
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked
                    disabled
                    className="mt-1 h-5 w-5 text-green-600 accent-green-600 cursor-not-allowed"
                  />
                  <div>
                    <p className="font-medium line-through text-gray-400">
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
      )}

      {/* ➕ Input para agregar nuevas tareas */}
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
