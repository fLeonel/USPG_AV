"use client";

import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { ReminderRepositoryImpl } from "@/core/infra/repositories/firebaseReminderRepository";
import { Reminders } from "@/core/domain/entities/reminders";
import { GetReminderByUser } from "@/core/usecases/reminders/getReminderByUser";

type AuthResponse = {
  user: {
    id: string;
    name: string;
    email: string;
  };
};

export default function Calendario() {
  const [user, setUser] = useState<AuthResponse["user"] | null>(null);
  const [reminders, setReminders] = useState<Reminders[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/auth/me");
        const data: AuthResponse = await res.json();

        if (!data?.user?.id) {
          throw new Error("ID de usuario inválido");
        }

        setUser(data.user);

        const repo = new ReminderRepositoryImpl();
        const usecase = new GetReminderByUser(repo);
        const remindersData = await usecase.execute(data.user.id);
        setReminders(remindersData);
      } catch (error) {
        console.error("❌ Error al cargar datos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="p-8">Cargando recordatorios...</p>;
  if (!user)
    return (
      <p className="p-8 text-red-600">Iniciá sesión para ver tu calendario.</p>
    );

  return (
    <div className="p-8 bg-gray-100 min-h-screen overflow-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Lista de recordatorios */}
        <div className="lg:col-span-1">
          <h2 className="text-2xl font-semibold mb-4">Recordatorios</h2>
          <div className="space-y-4">
            {reminders.map((reminder) => (
              <div
                key={reminder.id}
                className="flex items-center justify-between bg-white rounded-xl shadow px-6 py-4 hover:shadow-md transition-all"
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {reminder.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    📅{" "}
                    {reminder.date?.toLocaleDateString?.() ?? "Fecha inválida"}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    reminder.isCompleted
                      ? "bg-green-200 text-green-800"
                      : "bg-yellow-200 text-yellow-800"
                  }`}
                >
                  {reminder.isCompleted ? "Completado" : "Pendiente"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Calendario */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow h-fit">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={reminders.map((r) => ({
              title: r.title,
              date:
                r.date instanceof Date
                  ? r.date.toISOString().split("T")[0]
                  : "",
            }))}
            height="auto"
          />
        </div>
      </div>
    </div>
  );
}
