"use client";

import { useLoggedUserData } from "@/shared/hooks/useLoggedUserData";
import React from "react";
import {
  FiCalendar,
  FiList,
  FiFileText,
  FiLogOut,
  FiSettings,
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
    <div className="h-screen w-64 bg-black text-white p-4 flex flex-col relative">
      {/* Icono de ajustes */}
      <Link
        href="#"
        className="absolute top-4 right-4 text-white hover:text-gray-400"
      >
        <FiSettings size={20} />
      </Link>

      {/* Info del usuario */}
      <div className="mt-10 text-center">
        {user?.user_pic && (
          <Image
            src={user.user_pic}
            alt="Foto de perfil"
            width={80}
            height={80}
            className="w-20 h-20 mx-auto mb-2 rounded-full object-cover"
          />
        )}
        <h2 className="text-lg font-semibold">
          {loading ? "Cargando..." : user?.name}
        </h2>
        <p className="text-sm text-gray-400">{user?.email || "..."}</p>
      </div>

      {/* Navegación */}
      <nav className="mt-10 flex flex-col gap-4">
        <Link
          href="/presentation/auth/dashboard"
          className="flex items-center gap-2 hover:text-gray-300"
        >
          <FiCalendar /> Mi día
        </Link>
        <Link href="#" className="flex items-center gap-2 hover:text-gray-300">
          <FiList /> Tareas
        </Link>
        <Link href="#" className="flex items-center gap-2 hover:text-gray-300">
          <FiFileText /> Notas
        </Link>
      </nav>

      {/* Botón cerrar sesión */}
      <div className="mt-auto pt-6">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 p-2 rounded"
        >
          <FiLogOut /> Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
