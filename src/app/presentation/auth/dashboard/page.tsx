"use client";

import { useLoggedUserData } from "@/shared/hooks/useLoggedUserData";

export default function WelcomePage() {
  const user = useLoggedUserData();

  if (!user)
    return <p className="text-center mt-20 text-gray-500">Cargando...</p>;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#ffffff] text-[#171717]">
      <div className="bg-[#88a699] p-8 rounded-xl shadow-lg text-center max-w-md w-full">
        <h1 className="text-3xl font-bold text-[#2d4343] mb-4">
          ¡Hola, {user.name} 👋!
        </h1>
        <p className="text-[#171717] text-lg">
          Pronto verás algo hermoso aquí...{" "}
          <span className="italic">espéralo 😉</span>
        </p>
        <div className="mt-4 text-sm text-[#6f8b8f]">
          <p>Correo: {user.email}</p>
          <p>Carrera: {user.carrera}</p>
        </div>
      </div>
    </div>
  );
}
