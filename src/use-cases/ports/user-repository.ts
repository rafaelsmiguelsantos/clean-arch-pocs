import { UserRequestDTO, UserResponseDTO } from "../dto/user-dto";

export interface UserRepository {
  insertWithHashedPassword(user: UserRequestDTO, hashedPassword: string): Promise<UserResponseDTO>;
  findByEmail(email: string): Promise<UserResponseDTO | null>;
  findById(id: string): Promise<UserResponseDTO | null>;
}

