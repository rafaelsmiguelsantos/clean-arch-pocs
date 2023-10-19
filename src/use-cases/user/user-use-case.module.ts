import { Module } from "@nestjs/common";
import { RegisterUserUseCase } from "./register-use-case";
import { UserMapper } from "src/interface/mappers/user-mapper";
import { UserController } from "src/interface/controllers/user.controller";
import { UserMongoRepository } from "src/devices/db/user-mongodb-repository";
import { GetUserByIdUseCase } from "./get-user-by-id-use-case";
import { UserRepository } from "../ports/user-repository";
import { UserRepositoryModule } from "src/devices/user-repository.module";
import { BcryptAdapter } from "src/devices/adapters/bcrypt.service";
import { CompanyRepositoryModule } from "src/devices/company-repository.module";
import { EmployeeMongoRepositoryModule } from "src/devices/employee-repository.module";

@Module({
  imports: [UserRepositoryModule, EmployeeMongoRepositoryModule, CompanyRepositoryModule],
  controllers: [UserController],
  providers: [
    {
      provide: 'REGISTER_USER_USECASE',
      useFactory: (userRepository: UserRepository, userMapper: UserMapper, hash: BcryptAdapter) => {
        return new RegisterUserUseCase(userRepository, userMapper, hash);
      },
      inject: [UserMongoRepository, UserMapper, BcryptAdapter]
    },
    {
      provide: 'GET_USER_BY_ID_USECASE',
      useFactory: (userRepository: UserRepository) => {
        return new GetUserByIdUseCase(userRepository);
      },
      inject: [UserMongoRepository]
    },
    UserMapper,
    BcryptAdapter,
  ]
})
export class UserModule { }