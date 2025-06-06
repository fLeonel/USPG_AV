import { AuthRepository } from "@/core/domain/repositories/authRepository";
import { User } from "@/core/domain/entities/user";

/**
 * Estructura que representa los datos necesarios para registrar un usuario.
 */
interface RegisterInput {
  email: string;
  password: string;
  name: string;
  edad: number;
  carrera: string;
  user_pic?: string;
}

/**
 * Caso de uso: Registrar un nuevo usuario mediante correo y contraseña.
 */
export class SignUpWithEmail {
  /**
   * Crea una nueva instancia del caso de uso `SignUpWithEmail`.
   *
   * @param repo - Repositorio de autenticación que maneja el registro de usuarios.
   */
  constructor(private repo: AuthRepository) {}

  /**
   * Ejecuta el proceso de registro con los datos proporcionados.
   *
   * Si no se proporciona una imagen de perfil (`user_pic`), se asigna una imagen por defecto.
   *
   * @param input - Objeto con la información requerida para el registro.
   * @returns Una promesa que resuelve con el objeto `User` registrado.
   */
  async call(input: RegisterInput): Promise<User> {
    const { email, password, name, edad, carrera, user_pic } = input;

    return await this.repo.registerWithEmail(email, password, {
      name,
      edad,
      carrera,
      email,
      user_pic:
        user_pic ??
        "https://i.pinimg.com/736x/47/49/9a/47499a5cd90f926e9506b4a47435a0eb.jpg",
    });
  }
}
