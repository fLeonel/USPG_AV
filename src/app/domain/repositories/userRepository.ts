import { User } from "@/app/domain/entities/user";

export abstract class UserRepository {
  abstract getUsers(): Promise<User[]>;
  abstract signInWithGoogle(): Promise<User>;
}
