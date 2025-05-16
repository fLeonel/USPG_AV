"use client";
import { useState } from "react";
import { Bell } from "lucide-react";

export default function NotificationBell() {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setShow(!show)}
        className="relative cursor-pointer p-1 rounded-full hover:bg-gray-100 transition duration-200 ease-in-out"
      >
        <Bell className="w-6 h-6 text-gray-700 hover:text-gray-900" />
        <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-600 rounded-full"></span>
      </button>

      {show && (
        <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50">
          <p className="text-sm text-gray-700">🔔 Tienes 2 nuevas notificaciones</p>
          <ul className="mt-2 space-y-2 text-sm text-gray-600">
            <li>📢 Recordatorio: Revisar la tarea de hoy</li>
            <li>✅ Tu perfil está completo</li>
          </ul>
        </div>
      )}
    </div>
  );
}
