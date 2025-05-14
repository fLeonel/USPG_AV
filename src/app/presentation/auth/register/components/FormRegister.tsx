import { motion } from "framer-motion";

export const FormRegister = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-[var(--highlight)]">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Crear cuenta
          </h2>
          <form>
            {/* Nombre */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre
              </label>
              <input
                type="text"
                placeholder="Ingresa tu nombre"
                className="w-full h-12 px-3 border border-gray-200 rounded-xl focus-within:border-blue-500 transition"
              />
            </div>

            {/* Correo */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Correo electrónico
              </label>
              <input
                type="email"
                placeholder="Ingresa tu correo electrónico"
                className="w-full h-12 px-3 border border-gray-200 rounded-xl focus-within:border-blue-500 transition"
              />
            </div>

            {/* Contraseña */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contraseña
              </label>
              <input
                type="password"
                placeholder="Ingresa tu contraseña"
                className="w-full h-12 px-3 border border-gray-200 rounded-xl focus-within:border-blue-500 transition"
              />
            </div>

            {/* Botón */}
            <button
              type="submit"
              className="mt-6 bg-gray-900 hover:bg-gray-800 text-white font-medium text-sm rounded-xl h-12 w-full transition-colors cursor-pointer"
            >
              Crear cuenta
            </button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              ¿Ya tienes una cuenta?{" "}
              <a href="/presentation/auth/login" className="text-blue-500 font-medium hover:underline">
                Iniciar sesión
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
