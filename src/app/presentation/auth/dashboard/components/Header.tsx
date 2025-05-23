"use client";
import { useEffect, useState } from "react";
import Notificacion from "./Notificaciones";

export default function Header() {
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");

  useEffect(() => {
    const actualizarFechaHora = () => {
      const now = new Date();

      const opcionesFecha: Intl.DateTimeFormatOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      const opcionesHora: Intl.DateTimeFormatOptions = {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      };

      setFecha(now.toLocaleDateString("es-ES", opcionesFecha));
      setHora(now.toLocaleTimeString("es-ES", opcionesHora));
    };

    actualizarFechaHora();
    const intervalo = setInterval(actualizarFechaHora, 1000);

    return () => clearInterval(intervalo);
  }, []);

  return (
    <div className="flex justify-between items-start px-5 pt-6 pb-3">
      <div className="text-left text-[#171717]">
        <h2 className="text-3xl font-bold tracking-tight mb-1">
          📋 Mi día
        </h2>
        <p className="text-md text-gray-500 font-medium capitalize">{fecha}</p>
        <p className="text-sm text-gray-500">{hora}</p>
      </div>
      <Notificacion />
    </div>
  );
}
