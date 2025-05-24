import { AuthRepository } from "@/core/domain/repositories/authRepository";
import { User } from "@/core/domain/entities/user";

interface RegisterInput {
  email: string;
  password: string;
  name: string;
  edad: number;
  carrera: string;
  user_pic?: string;
}

export class SignUpWithEmail {
  constructor(private repo: AuthRepository) {}

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
