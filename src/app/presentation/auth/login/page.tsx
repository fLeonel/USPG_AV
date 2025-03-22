'use client';

import { GoogleLoginButton } from "@/presentation/auth/login/components/GoogleButton";

export const LoginScreen = () => {
  return (
    <div className="min-h-screen flex bg-background text-foreground transition-colors duration-300">

      {/* Lado Izquierdo (Ilustración / Info) */}
      <div className="hidden md:flex w-1/2 items-center justify-center bg-secondary text-white">
        <div className="text-center p-8 space-y-4">
          <h1 className="text-3xl font-bold">Bienvenido a USPG Virtual Assistance</h1>
          <p className="text-lg">
            Un sistema académico moderno para gestionar notas, eventos y notificaciones.
          </p>
        </div>
      </div>

      {/* Lado Derecho (Formulario) */}
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <div className="w-full max-w-md px-8 py-12">
          <h2 className="text-2xl font-bold mb-6 text-foreground">
            Iniciá sesión
          </h2>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-foreground">Email</label>
              <input
                type="email"
                placeholder="Correo institucional"
                className="w-full px-4 py-2 border border-gray-300 rounded bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-foreground">Contraseña</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-gray-300 rounded bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="flex items-center justify-between text-sm text-foreground">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="form-checkbox text-primary" />
                Recuérdame
              </label>
              <a href="#" className="text-accent hover:underline">
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-primary hover:bg-accent text-white py-2 px-4 rounded transition"
            >
              Iniciar sesión
            </button>
          </form>

          <div className="my-6 text-center text-sm text-muted-foreground">o</div>

          <div className="flex justify-center">
            <GoogleLoginButton />
          </div>

          <p className="text-sm text-center mt-6 text-foreground">
            ¿No tenés cuenta?{" "}
            <a href="#" className="text-accent hover:underline">
              Creá una aquí
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
