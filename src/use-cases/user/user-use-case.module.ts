import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { RegisterUserUseCase } from "./register-use-case";
import { UserMapper } from "src/interface/mappers/user-mapper";
import { UserController } from "src/interface/controllers/user.controller";
import { UserMongoRepository } from "src/devices/db/user-mongodb-repository";
import { GetUserByIdUseCase } from "./get-user-by-id-use-case";
import { UserRepository } from "../ports/user-repository";
import { UserRepositoryModule } from "src/devices/user-repository.module";
import { BcryptAdapter } from "src/devices/adapters/bcrypt.service";
import { RegisterEmployeeUseCase } from "./register-employee-use-case";
import ICompanyRepository from "../ports/company-repository";
import { EmployeeRepository } from "../ports/employee-repository";
import { CompanyMongoRepository } from "src/devices/db/company-repository";
import { EmployeeMapper } from "src/interface/mappers/employee-mapper";
import { EMPLOYEE_REPOSITORY_TOKEN, ValidateUserIdMiddleware } from "src/interface/middleware/validate-user-middleware";
import { CompanyRepositoryModule } from "src/devices/company-repository.module";
import { EmployeeMongoRepositoryModule } from "src/devices/employee-repository.module";
import { ValidateUserIdMiddlewareModule } from "src/interface/middleware/validate-user.middleware.module";
import { ModuleRef } from "@nestjs/core";

@Module({
  imports: [UserRepositoryModule, EmployeeMongoRepositoryModule, CompanyRepositoryModule, ValidateUserIdMiddlewareModule],
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
    {
      provide: 'REGISTER_EMPLOYEE_USECASE',
      useFactory: (userRepository: EmployeeRepository, companyRepository: ICompanyRepository , userMapper: EmployeeMapper, hash: BcryptAdapter) => {
        return new RegisterEmployeeUseCase(userRepository, companyRepository, userMapper, hash);
      },
      inject: [EMPLOYEE_REPOSITORY_TOKEN, CompanyMongoRepository, EmployeeMapper, BcryptAdapter]
    },
    EmployeeMapper,
    UserMapper,
    BcryptAdapter,
  ]
})
export class UserModule implements NestModule {
  constructor(private readonly moduleRef: ModuleRef) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidateUserIdMiddleware)
      .forRoutes('user/register-employee');
  }
}