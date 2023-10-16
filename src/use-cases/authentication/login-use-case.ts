// src/domain/use-cases/login.use-case.ts
import { LoginRequestDTO, LoginResponseDTO } from '../dto/login-dto';
import { IAuthService } from '../ports/auth-service.interface';

export class LoginUseCase {
  constructor(private readonly authService: IAuthService) {}

  async execute(loginDto: LoginRequestDTO): Promise<LoginResponseDTO> {
    return this.authService.authenticate(loginDto);
  }
}
