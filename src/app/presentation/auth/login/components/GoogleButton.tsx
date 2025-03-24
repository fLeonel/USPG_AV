"use client";

import { FirebaseUserRepository } from "@/app/core/infra/repositories/firebaseUserRepository";
import { SignInWithGoogle } from "@/app/core/usecases/signInWithGoogle";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pointer } from "lucide-react";
import "bootstrap-icons/font/bootstrap-icons.css";

export const GoogleLoginButton = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const repo = new FirebaseUserRepository();
      const signIn = new SignInWithGoogle(repo);
      const user = await signIn.execute();
      console.log("Usuario autenticado:", user);
      router.push("/presentation/auth/dashboard");
    } catch (err) {
      console.error("Error al iniciar sesión con Google:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogin}
      disabled={loading}
      className="bg-red-500 hover:bg-red-600 duration-500 text-white font-bold py-2 px-4 rounded"
      style={{ cursor: "pointer" }}
    >
      {loading ? (
        "Conectando..."
      ) : (
        <>
          Iniciar sesión con Google <i className="bi bi-google"></i>
        </>
      )}
    </button>
  );
};
