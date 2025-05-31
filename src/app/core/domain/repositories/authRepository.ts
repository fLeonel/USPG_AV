import { User } from "@/domain/entities/user";

/**
 * Define las operaciones de autenticación disponibles para el sistema.
 */
export interface AuthRepository {
    /**
   * Registra un nuevo usuario utilizando correo electrónico y contraseña.
   * 
   * @param email - Correo electrónico del usuario.
   * @param password - Contraseña del usuario.
   * @param data - Datos adicionales del usuario, excluyendo `id` y `createAt`.
   * @returns Una promesa que resuelve con el usuario creado.
   */
  registerWithEmail(
    email: string,
    password: string,
    data: Omit<User, "id" | "createAt">,
  ): Promise<User>;
}
