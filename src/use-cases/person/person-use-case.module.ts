import { Module } from "@nestjs/common";
import { InMemoryRepository } from "src/devices/in-memory-db";
import { PersonController } from "src/interface/controllers/person.controller";
import { PERSON_MAPPER_TOKEN, RegisterUserUseCase } from "./register-use-case";
import { PersonMapper } from "src/interface/mappers/person-mapper";

@Module({
  controllers: [PersonController],
  providers: [
    PersonMapper,
    InMemoryRepository,
    RegisterUserUseCase,
    {
      provide: 'REGISTER_USER_USECASE',
      useClass: RegisterUserUseCase,
    },
    {
      provide: 'PersonRepositoryToken',
      useClass: InMemoryRepository,
    },
    {
      provide: PERSON_MAPPER_TOKEN,
      useClass: PersonMapper
    },
  ]
})
export class PersonModule { }
