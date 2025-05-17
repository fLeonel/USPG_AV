"use client";

import { useLoggedUserData } from "@/shared/hooks/useLoggedUserData";
import SidebarLayout from "../components/sidebarLayout";
import Header from "./components/Header";
import ConteoTareas from "./components/ConteoTareas";

export default function WelcomePage() {
  const user = useLoggedUserData();

  if (!user)
    return <p className="text-center mt-20 text-gray-500">Cargando...</p>;

  return (
    <SidebarLayout>
      {/* Header con notificaciones */}
      <Header />
      {/* Tarjetas de conteo de tareas*/}
      <div className="flex flex-col items-center bg-white text-[#171717] min-h-screen pt-20">
        <ConteoTareas />
      </div>
    </SidebarLayout>
  );
}
