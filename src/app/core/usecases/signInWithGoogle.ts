import { UserRepository } from "@/domain/repositories/userRepository";

export class SignInWithGoogle {
  constructor(private userRepo: UserRepository) {}

  async execute() {
    const user = await this.userRepo.signInWithGoogle();

    if (!user) {
      throw new Error("No se pudo autenticar con Google");
    }

    const response = await fetch("/api/auth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error("Error al generar token");
    }

    const { token } = await response.json();

    return { user, token };
  }
}
