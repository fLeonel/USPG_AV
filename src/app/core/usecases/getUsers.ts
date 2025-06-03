import { User } from "@/domain/entities/user";
import { UserRepository } from "@/domain/repositories/userRepository";

/**
 * Caso de uso para obtener todos los usuarios del sistema.
 */
export class GetUsers {
  /**
   * Crea una instancia del caso de uso `GetUsers`.
   *
   * @param userRepo - Repositorio que define la interfaz para acceder a los datos de usuario.
   */
  constructor(private userRepo: UserRepository) {}

  /**
   * Ejecuta el caso de uso para obtener una lista de usuarios.
   *
   * @returns Una promesa que resuelve con un array de objetos `User`.
   */
  async execute(): Promise<User[]> {
    return await this.userRepo.getUsers();
  }
}
