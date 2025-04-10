import { User } from "@/domain/entities/user";

export abstract class UserRepository {
  abstract getUsers(): Promise<User[]>;
  abstract signInWithGoogle(): Promise<User>;
}
