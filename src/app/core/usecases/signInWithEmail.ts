import { AuthRepository } from "@/core/domain/repositories/authRepository";
import { User } from "@/core/domain/entities/user";

export class SignUpWithEmail {
  constructor(private repo: AuthRepository) {}

  async call(
    email: string,
    password: string,
    data: Omit<User, "id" | "createAt">,
  ): Promise<User> {
    return await this.repo.registerWithEmail(email, password, data);
  }
}
