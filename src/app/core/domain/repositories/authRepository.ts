import { User } from "@/domain/entities/user";

export interface AuthRepository {
  registerWithEmail(
    email: string,
    password: string,
    data: Omit<User, "id" | "createAt">,
  ): Promise<User>;
}
