"use client";

import { useLoggedUserData } from "@/shared/hooks/useLoggedUserData";
import React from "react";
import { FiHome, FiCalendar, FiList, FiFileText, FiLogOut, FiUser, FiSettings } from "react-icons/fi";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Sidebar: React.FC = () => {
  const router = useRouter();
  const user = useLoggedUserData();

  const handleLogout = () => {
    {/* Aqui regresa o limpia el token que da cuando se inicia sesion */}
    router.push("/");
  };

  return (
    
    <div className="h-screen w-64 bg-black text-white p-4 flex flex-col relative">
      {/* Boton para ajustes, pendiente la creacion de pagina y enlazar. Y corregir el nombre para enlazar*/}
      <Link href="#" className="absolute top-4 right-4 text-white hover:text-gray-400">
        <FiSettings size={20} />
      </Link>


      {/* Información del usuario */}
      <div className="mt-10 text-center">

        {/* Recupera la foto del usuario registrado */}
        {user?.user_pic &&  (
          <img
            src={user.user_pic}
            alt="Foto de perfil"
            className="w-20 h-20 mx-auto mb-2 rounded-full object-cover"
          />
        )}

        {/* Recupera el nombre del usuario registrado */}
        <h2 className="text-lg font-semibold">{user?.name || "Cargando..."}</h2>

        {/* Recupera el correo del usuario registrado */}
        <p className="text-sm text-gray-400">{user?.email || "..."}</p>
      </div>

      {/* Navegación */}
      <nav className="mt-10 flex flex-col gap-4">
        <Link href="/presentation/auth/dashboard" className="flex items-center gap-2 hover:text-gray-300">
          <FiHome /> Mi día
        </Link>
        {/* Pendiente de creacion de la pagina tareas y enlazarY corregir el nombre para enlazar*/}
        <Link href="#" className="flex items-center gap-2 hover:text-gray-300">
          <FiList /> Tareas
        </Link>
        {/* Creacion de seccion faltante de calendario, y pendiente a creacion de la pagina y de enlazarlo y la correcion de nombre para enlazar*/}
        <Link href="#" className="flex items-center gap-2 hover:text-gray-300">
          <FiCalendar /> Calendario
        </Link>
        {/* Pendiente de creacion de la pagina notas y enlazar. Y corregir el nombre para enlazar*/}
        <Link href="#" className="flex items-center gap-2 hover:text-gray-300">
          <FiFileText /> Notas
        </Link>
      </nav>

      {/* Botón de cerrar sesión */}
      {/* Redireccionamiento al login funcional */}
      <div className="mt-auto pt-6">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 p-2 rounded">
          <FiLogOut /> Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
