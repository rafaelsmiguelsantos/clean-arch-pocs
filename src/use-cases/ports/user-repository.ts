import { User } from "src/entities/User";
import { UserDTO } from "src/interface/dto/user-converter";

export interface UserRepository {
  insert(user: User): Promise<UserDTO>;
  findByEmail(email: string): Promise<User | null>;
}
