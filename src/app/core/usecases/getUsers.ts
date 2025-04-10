import { User } from "@/domain/entities/user";
import { UserRepository } from "@/domain/repositories/userRepository";

export class GetUsers {
  constructor(private userRepo: UserRepository) {}

  async execute(): Promise<User[]> {
    return await this.userRepo.getUsers();
  }
}
