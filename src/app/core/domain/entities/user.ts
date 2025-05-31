/**
 * Representa un usuario del sistema con información básica y de perfil.
 */
export class User {
  /**
   * Crea una nueva instancia de `User`.
   *
   * @param id - Identificador único del usuario.
   * @param carrera - Carrera o área de estudio del usuario.
   * @param createAt - Fecha de creación del usuario.
   * @param edad - Edad del usuario.
   * @param name - Nombre completo del usuario.
   * @param email - Correo electrónico del usuario.
   * @param user_pic - URL de la foto de perfil del usuario.
   */
  constructor(
    public readonly id: string,
    public readonly carrera: string,
    public readonly createAt: Date,
    public readonly edad: number,
    public readonly name: string,
    public readonly email: string,
    public readonly user_pic: string
  ) {}

    /**
   * Crea una instancia de `User` a partir de un objeto JSON.
   * 
   * @param id - Identificador único del usuario.
   * @param json - Objeto que contiene los datos del usuario.
   * Debe incluir las claves: `carrera`, `createAt`, `edad`, `name`, `email`, y `user_pic`.
   * @returns Una nueva instancia de `User`.
   */

  static fromJson(id: string, json: Record<string, unknown>): User {
    return new User(
      id,
      json["carrera"] as string,
      (json["createAt"] as { toDate: () => Date }).toDate(),
      json["edad"] as number,
      json["name"] as string,
      json["email"] as string,
      json["user_pic"] as string
    );
  }
}
