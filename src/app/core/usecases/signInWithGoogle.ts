import { UserRepository } from "@/app/domain/repositories/userRepository";

export class SignInWithGoogle {
  constructor(private userRepo: UserRepository) {}

  async execute() {
    return await this.userRepo.signInWithGoogle();
  }
}
