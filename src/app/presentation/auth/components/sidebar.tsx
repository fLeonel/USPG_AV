"use client";

import { useLoggedUserData } from "@/shared/hooks/useLoggedUserData";
import React from "react";
import {
  FiCalendar,
  FiFileText,
  FiLogOut,
  FiSettings,
  FiHome,
} from "react-icons/fi";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const Sidebar: React.FC = () => {
  const router = useRouter();
  const { user, loading } = useLoggedUserData();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });
      router.push("/"); // redirecciona al login u home
    } catch (err) {
      console.error("Error al cerrar sesión:", err);
    }
  };

  return (
    <div
      className="h-screen w-64 p-6 flex flex-col relative shadow-lg"
      style={{ backgroundColor: "var(--primary)", color: "var(--background)" }}
    >
      {/* Icono de ajustes */}
      <Link
        href="#"
        className="absolute top-4 right-4 text-white hover:text-gray-400 transition-colors"
      >
        <FiSettings size={20} />
      </Link>

      {/* Info del usuario */}
      <div className="mt-12 text-center">
        {user?.user_pic && (
          <Image
            src={user.user_pic}
            alt="Foto de perfil"
            width={80}
            height={80}
            className="w-20 h-20 mx-auto mb-2 rounded-full object-cover border-2 border-white shadow-md"
          />
        )}
        <h2 className="text-xl font-bold">
          {loading ? "Cargando..." : user?.name}
        </h2>
        <p className="text-sm text-gray-400 mt-1">{user?.email || "..."}</p>
      </div>

      {/* Línea divisora */}
      <div className="my-6 border-t border-gray-500" />

      {/* Navegación */}
      <nav className="flex flex-col gap-3">
        <Link
          href="/presentation/auth/dashboard"
          className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-[#3b5a5a] transition-colors"
        >
          <FiHome /> <span>Mi día</span>
        </Link>
        <Link
          href="/presentation/notas"
          className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-[#3b5a5a] transition-colors"
        >
          <FiFileText /> <span>Notas</span>
        </Link>
        <Link
          href="/presentation/calendario"
          className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-[#3b5a5a] transition-colors"
        >
          <FiCalendar /> <span>Calendario</span>
        </Link>
      </nav>

      {/* Botón cerrar sesión */}
      <div className="mt-auto pt-6">
        <button
          onClick={handleLogout}
          className="w-full cursor-pointer flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-700 transition-colors p-2 rounded-md font-semibold shadow-md"
        >
          <FiLogOut /> Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
