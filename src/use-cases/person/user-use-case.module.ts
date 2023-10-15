import { Module } from "@nestjs/common";
import { PERSON_MAPPER_TOKEN, RegisterUserUseCase } from "./register-use-case";
import { UserMapper } from "src/interface/mappers/user-mapper";
import { UserController } from "src/interface/controllers/person.controller";
import { UserMongoRepository } from "src/devices/user-mongodb-repository";

@Module({
  controllers: [UserController],
  providers: [
    UserMapper,
    {
      provide: 'UserRepositoryToken',
      useClass: UserMongoRepository, // Sua implementação concreta
    },
    {
      provide: PERSON_MAPPER_TOKEN,
      useClass: UserMapper
    },
    {
      provide: 'REGISTER_USER_USECASE',
      useFactory: (userRepository: UserMongoRepository, mapper: UserMapper) => {
        return new RegisterUserUseCase(userRepository, mapper);
      },
      inject: ['UserRepositoryToken', PERSON_MAPPER_TOKEN],
    },
  ]
})
export class UserModule { }

