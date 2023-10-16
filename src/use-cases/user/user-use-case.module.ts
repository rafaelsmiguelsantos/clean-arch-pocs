import { Module } from "@nestjs/common";
import { RegisterUserUseCase } from "./register-use-case";
import { UserMapper } from "src/interface/mappers/user-mapper";
import { UserController } from "src/interface/controllers/user.controller";
import { UserMongoRepository } from "src/devices/user-mongodb-repository";
import { GetUserByIdUseCase } from "./get-user-by-id-use-case";
import { UserRepository } from "../ports/user-repository";
import { UserRepositoryModule } from "src/devices/user-repository.module";

@Module({
  imports: [UserRepositoryModule],
  controllers: [UserController],
  providers: [
    {
      provide: 'REGISTER_USER_USECASE',
      useFactory: (userRepository: UserRepository, userMapper: UserMapper) => {
        return new RegisterUserUseCase(userRepository, userMapper);
      },
      inject: [UserMongoRepository, UserMapper]
    },
    {
      provide: 'GET_USER_BY_ID_USECASE',
      useFactory: (userRepository: UserRepository) => {
        return new GetUserByIdUseCase(userRepository);
      },
      inject: [UserMongoRepository]
    },
    UserMapper
  ]
})
export class UserModule { }
