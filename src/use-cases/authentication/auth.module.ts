import { Module } from "@nestjs/common";
import { UserRepositoryModule } from "src/devices/user-repository.module";
import { AuthController } from "src/interface/controllers/authentication.controller";
import { IAuthService } from "../ports/auth-service.interface";
import { LoginUseCase } from "./login-use-case";
import { AuthService } from "src/devices/adapters/auth.service";
import { JWTTokenService } from "src/devices/adapters/jwt.service";
import { UserMongoRepository } from "src/devices/db/user-mongodb-repository";


@Module({
  imports: [UserRepositoryModule],
  controllers: [AuthController],
  providers: [
    JWTTokenService,
    {
      provide: 'LOGIN_USECASE',
      useFactory: (authService: IAuthService) => {
        return new LoginUseCase(authService);
      },
      inject: ['AUTH_SERVICE']
    },
    {
      provide: 'AUTH_SERVICE',
      useFactory: (userRepository: UserMongoRepository, tokenService: JWTTokenService) => {
        return new AuthService(userRepository, tokenService);
      },
      inject: [UserMongoRepository, JWTTokenService]
    }
    // Adicione outros serviços, adaptadores, mappers, etc. conforme necessário
  ]
})
export class AuthModule { }
