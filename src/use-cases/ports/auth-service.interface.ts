import { LoginRequestDTO, LoginResponseDTO } from "../dto/login-dto";

export interface IAuthService {
  authenticate(loginDto: LoginRequestDTO): Promise<LoginResponseDTO>;
}