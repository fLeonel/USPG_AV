import { UserRepository } from "@/domain/repositories/userRepository";

/**
 * Caso de uso: Autenticación de usuario mediante Google.
 *
 * Este caso de uso permite al usuario iniciar sesión con Google, y en caso de éxito,
 * genera un token llamando a la API `/api/auth/generate-token`.
 */
export class SignInWithGoogle {
  /**
   * Crea una nueva instancia del caso de uso `SignInWithGoogle`.
   *
   * @param userRepo - Repositorio de usuarios que maneja la lógica de autenticación con Google.
   */
  constructor(private userRepo: UserRepository) {}

  /**
   * Ejecuta el proceso de autenticación con Google.
   *
   * Si la autenticación falla o la generación del token no es exitosa, se lanzan errores.
   *
   * @returns Un objeto con la información del usuario autenticado.
   * @throws Error si la autenticación con Google o la generación del token falla.
   */
  async execute() {
    const user = await this.userRepo.signInWithGoogle();

    if (!user) {
      throw new Error("No se pudo autenticar con Google");
    }

    const response = await fetch("/api/auth/generate-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error("Error al generar token");
    }

    return { user };
  }
}
