"use client";

import { GoogleLoginButton } from "@/presentation/auth/login/components/GoogleButton";

export const LoginScreen = () => {
  return (
    <div className="min-h-screen flex">
      {/* Lado Izquierdo (Imagen o ilustración) */}
      <div className="w-1/2 bg-gray-50 flex items-center justify-center">
        {/* Aquí va tu imagen animada 3D */}
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Bienvenido a Woodmiles</h1>
          <p className="text-gray-500">Tu sistema de puntos y recompensas ✨</p>
        </div>
      </div>

      {/* Lado Derecho (Formulario) */}
      <div className="w-1/2 flex items-center justify-center bg-white">
        <div className="w-full max-w-md px-8">
          <h2 className="text-2xl font-bold mb-6">Iniciá sesión 🚀</h2>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Contraseña
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="form-checkbox" />
                Recuérdame
              </label>
              <a href="#" className="text-blue-500 hover:underline">
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded transition"
            >
              Iniciar sesión
            </button>
          </form>

          <div className="my-6 text-center text-sm text-gray-500">o</div>

          <div className="flex justify-center">
            <GoogleLoginButton />
          </div>

          <p className="text-sm text-center mt-6 text-gray-600">
            ¿No tenés cuenta?{" "}
            <a href="#" className="text-blue-500 hover:underline">
              Creá una aquí
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
