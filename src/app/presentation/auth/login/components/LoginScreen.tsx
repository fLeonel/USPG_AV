"use client";

import { motion } from "framer-motion";
import { GoogleLoginButton } from "@/presentation/auth/login/components/GoogleButton";
import LoginCarousel from "./LoginCarousel";

export const LoginScreen = () => {
  return (
    <div className="min-h-screen flex transition-colors duration-300">
      {/* Lado Izquierdo (Carrusel) */}
      <div className="hidden md:flex w-1/2 items-center justify-center">
        <div className="text-center p-8 flex flex-col items-center">
          <LoginCarousel />
        </div>
      </div>

      {/* Lado Derecho (Formulario) */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-[var(--highlight)] text-foreground rounded-2xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="w-full max-w-md p-4"
        >
          <form className="flex flex-col gap-4 bg-white p-8 w-full rounded-2xl shadow-md text-gray-800">
            <h2 className="text-2xl font-bold text-center mb-2">
              Iniciá sesión
            </h2>

            {/* Email */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold mb-1 text-gray-800">
                Email
              </label>
              <div className="flex items-center h-12 px-3 border border-gray-200 rounded-xl focus-within:border-blue-500 transition">
                <input
                  type="email"
                  placeholder="Ejemplo: dr04860@gmail.com"
                  className="ml-2 w-full h-full bg-transparent border-none outline-none placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Contraseña */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold mb-1 text-gray-800">
                Contraseña
              </label>
              <div className="flex items-center h-12 px-3 border border-gray-200 rounded-xl focus-within:border-blue-500 transition">
                <input
                  type="password"
                  placeholder="Ingresa tu contraseña"
                  className="ml-2 w-full h-full bg-transparent border-none outline-none placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Recuérdame y enlace */}
            <div className="flex items-center justify-between text-sm text-gray-600 mt-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="form-checkbox text-blue-500"
                />
                Recuérdame
              </label>
              <a href="#" className="text-blue-500 font-medium hover:underline">
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            {/* Botón */}
            <button
              type="submit"
              className="mt-6 bg-gray-900 hover:bg-gray-800 text-white font-medium text-sm rounded-xl h-12 w-full transition-colors"
            >
              Iniciar sesión
            </button>

            {/* Separador */}
            <div className="flex items-center my-4">
              <div className="flex-grow h-px bg-gray-200" />
              <span className="px-3 text-sm text-gray-400">o</span>
              <div className="flex-grow h-px bg-gray-200" />
            </div>

            {/* Google Button */}
            <GoogleLoginButton />

            {/* Registro */}
            <p className="text-center text-sm text-gray-700 mt-4">
              ¿No tenés cuenta?
              <a
                href="#"
                className="text-blue-500 font-medium ml-1 hover:underline"
              >
                Creá una aquí
              </a>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
};
export default LoginScreen;

