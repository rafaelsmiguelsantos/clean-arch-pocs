import { Module } from "@nestjs/common";
import { PERSON_MAPPER_TOKEN, RegisterUserUseCase } from "./register-use-case";
import { UserMapper } from "src/interface/mappers/user-mapper";
import { UserController } from "src/interface/controllers/person.controller";
import { UserMongoRepository } from "src/devices/user-mongodb-repository";

@Module({
  controllers: [UserController],
  providers: [
    UserMapper,
    RegisterUserUseCase,
    {
      provide: 'UserRepositoryToken',
      useClass: UserMongoRepository, // Sua implementação concreta
    },
    {
      provide: 'REGISTER_USER_USECASE',
      useClass: RegisterUserUseCase,
    },
    {
      provide: PERSON_MAPPER_TOKEN,
      useClass: UserMapper
    },
  ]
})
export class UserModule { }
