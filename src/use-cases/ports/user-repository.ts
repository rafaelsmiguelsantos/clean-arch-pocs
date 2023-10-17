import { User } from "src/entities/User";
import { UserResponseDTO } from "../dto/user-dto";

export interface UserRepository {
  insert(user: User, hashedPassword: string): Promise<UserResponseDTO>;
  findByEmail(email: string): Promise<UserResponseDTO | null>;
  findById(id: string): Promise<UserResponseDTO | null>;
}

