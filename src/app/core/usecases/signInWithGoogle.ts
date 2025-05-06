import { UserRepository } from "@/domain/repositories/userRepository";
import { signInWithGoogleAndGenerateToken } from "@/core/usecases/signInWithGoogleAndGenerateToken";

export class SignInWithGoogle {
  constructor(private userRepo: UserRepository) {}

  async execute() {
    const user = await this.userRepo.signInWithGoogle();

    if (!user) {
      throw new Error("No se pudo autenticar con Google");
    }

    const token = await signInWithGoogleAndGenerateToken(user);

    return { user, token };
  }
}
