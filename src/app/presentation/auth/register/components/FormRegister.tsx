import { motion } from "framer-motion";
import { useState } from "react";

export const FormRegister = () => {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [edad, setEdad] = useState<number | "">("");
  const [carrera, setCarrera] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!nombre.trim()) newErrors.nombre = "El nombre es obligatorio";
    if (!correo.trim()) newErrors.correo = "El correo es obligatorio";
    if (!password.trim()) newErrors.password = "La contraseña es obligatoria";
    else if (password.length < 4) newErrors.password = "Mínimo 4 caracteres";
    if (!confirmPassword.trim())
      newErrors.confirmPassword = "Debes confirmar tu contraseña";
    if (password !== confirmPassword)
      newErrors.confirmPassword = "Las contraseñas no coinciden";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      //Aqui se enviará la información al backend
      console.log({ nombre, edad, carrera, correo, password });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen py-12 bg-[var(--highlight)]">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Crear cuenta
          </h2>
          <form onSubmit={handleSubmit}>
            {/* Nombre */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre
              </label>
              <input
                type="text"
                placeholder="Ingresa tu nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full h-12 px-3 border border-gray-200 rounded-xl focus:border-blue-500 outline-none transition"
              />
              {errors.nombre && (
                <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>
              )}
            </div>

            {/* Edad (opcional) */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Edad (opcional)
              </label>
              <input
                type="number"
                placeholder="Ingresa tu edad"
                value={edad}
                onChange={(e) =>
                  setEdad(e.target.value === "" ? "" : Number(e.target.value))
                }
                className="w-full h-12 px-3 border border-gray-200 rounded-xl focus:border-blue-500 outline-none transition"
              />
            </div>

            {/* Carrera (opcional) */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Carrera (opcional)
              </label>
              <input
                type="text"
                placeholder="Ingresa tu carrera"
                value={carrera}
                onChange={(e) => setCarrera(e.target.value)}
                className="w-full h-12 px-3 border border-gray-200 rounded-xl focus:border-blue-500 outline-none transition"
              />
            </div>

            {/* Correo */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Correo electrónico
              </label>
              <input
                type="email"
                placeholder="Ingresa tu correo"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                className="w-full h-12 px-3 border border-gray-200 rounded-xl focus:border-blue-500 outline-none transition"
              />
              {errors.correo && (
                <p className="text-red-500 text-sm mt-1">{errors.correo}</p>
              )}
            </div>

            {/* Contraseña */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contraseña
              </label>
              <input
                type="password"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 px-3 border border-gray-200 rounded-xl focus:border-blue-500 outline-none transition"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Confirmar contraseña */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirmar contraseña
              </label>
              <input
                type="password"
                placeholder="Confirma tu contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full h-12 px-3 border border-gray-200 rounded-xl focus:border-blue-500 outline-none transition"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Botón */}
            <button
              type="submit"
              className="mt-6 bg-gray-900 hover:bg-gray-800 text-white font-medium text-sm rounded-xl h-12 w-full transition-colors"
            >
              Crear cuenta
            </button>
          </form>

          {/* Link de login */}
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              ¿Ya tienes una cuenta?{" "}
              <a
                href="/presentation/auth/login"
                className="text-blue-500 font-medium hover:underline"
              >
                Iniciar sesión
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
export default FormRegister;
