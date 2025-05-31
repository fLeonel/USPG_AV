import { User } from "@/domain/entities/user";

/**
 * Define la interfaz base para las operaciones relacionadas con usuarios en el sistema.
 *
 * Esta clase abstracta debe ser extendida por implementaciones concretas que interactúen
 * con una base de datos o proveedor externo.
 */
export abstract class UserRepository {
  /**
   * Obtiene una lista de todos los usuarios registrados.
   *
   * @returns Una promesa que resuelve con un arreglo de usuarios.
   */
  abstract getUsers(): Promise<User[]>;
  /**
   * Inicia sesión del usuario utilizando autenticación con Google.
   *
   * @returns Una promesa que resuelve con el usuario autenticado.
   */
  abstract signInWithGoogle(): Promise<User>;
  /**
   * Crea un nuevo usuario en el sistema.
   *
   * @param user - El usuario a crear.
   * @returns Una promesa que se resuelve cuando la operación finaliza.
   */
  abstract create(user: User): Promise<void>;
}
