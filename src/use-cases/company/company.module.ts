import { Module } from "@nestjs/common";
import { UserMapper } from "src/interface/mappers/user-mapper";
import { UserMongoRepository } from "src/devices/db/user-mongodb-repository";
import { UserRepository } from "../ports/user-repository";
import { CompanyRepositoryModule } from "src/devices/company-repository.module";
import { CompanyController } from "src/interface/controllers/company.controller";
import ICompanyRepository from "../ports/company-repository";
import { CreateCompanyUseCase } from "./company-use-case";
import { CompanyMongoRepository } from "src/devices/db/company-repository";
import { CompanyMapper } from "src/interface/mappers/company-mapper";
import { UserRepositoryModule } from "src/devices/user-repository.module";

@Module({
  imports: [CompanyRepositoryModule, UserRepositoryModule],
  controllers: [CompanyController],
  providers: [
    {
      provide: 'CREATE_COMPANY_USECASE',
      useFactory: (companyRepository: ICompanyRepository, userRepository: UserRepository, userMapper: CompanyMapper) => {
        return new CreateCompanyUseCase(companyRepository, userRepository, userMapper);
      },
      inject: [CompanyMongoRepository , UserMongoRepository, CompanyMapper]
    },
    CompanyMapper,
  ]
})
export class CompanyModule { }
