import { User } from '@/app/domain/entities/user';
import { UserRepository } from '@/app/domain/repositories/userRepository';


export class GetUsers {
  constructor(private userRepo: UserRepository) { }

  async execute(): Promise<User[]> {
    return await this.userRepo.getUsers();
  }
}
