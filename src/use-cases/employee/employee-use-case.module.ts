import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { UserController } from "src/interface/controllers/user.controller";;
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
import { EmployeeController } from "src/interface/controllers/employee.controller";

@Module({
  imports: [EmployeeMongoRepositoryModule, CompanyRepositoryModule, ValidateUserIdMiddlewareModule],
  controllers: [EmployeeController],
  providers: [
    {
      provide: 'REGISTER_EMPLOYEE_USECASE',
      useFactory: (userRepository: EmployeeRepository, companyRepository: ICompanyRepository, userMapper: EmployeeMapper, hash: BcryptAdapter) => {
        return new RegisterEmployeeUseCase(userRepository, companyRepository, userMapper, hash);
      },
      inject: [EMPLOYEE_REPOSITORY_TOKEN, CompanyMongoRepository, EmployeeMapper, BcryptAdapter]
    },
    EmployeeMapper,
    BcryptAdapter,
  ]
})
export class EmployeeModule implements NestModule {
  constructor(private readonly moduleRef: ModuleRef) { }

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidateUserIdMiddleware)
      .forRoutes('user/register-employee');
  }
}