import { User } from "src/entities/User";

export interface UserRepository {
  insert(user: User): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
}
