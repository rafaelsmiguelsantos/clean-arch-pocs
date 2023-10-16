// src/infrastructure/services/auth.service.ts
import { Injectable } from '@nestjs/common';
import { LoginRequestDTO, LoginResponseDTO } from 'src/use-cases/dto/login-dto';
import { IAuthService } from 'src/use-cases/ports/auth-service.interface';
import { TokenService } from 'src/use-cases/ports/token-service.interface';
import { UserRepository } from 'src/use-cases/ports/user-repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tokenService: TokenService
  ) { }

  async authenticate(loginDto: LoginRequestDTO): Promise<LoginResponseDTO> {
    const user = await this.userRepository.findByEmail(loginDto.email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isValid = await bcrypt.compare(loginDto.password, user.password);
    if (!isValid) {
      throw new Error('Invalid credentials');
    }

    const tokenDetails = await this.tokenService.generateToken({ userId: user.id });

    return {
      token: tokenDetails.token,
      expiresIn: tokenDetails.expiresIn,
      userId: user.id,
      email: loginDto.email
    };
  }
}
