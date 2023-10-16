import { User } from "src/entities/User";
import { UserResponseDTO } from "../dto/user-dto";

export interface UserRepository {
  insertWithHashedPassword(user: User, hashedPassword: string): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<UserResponseDTO | null>;
}

