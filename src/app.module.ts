import { Module } from '@nestjs/common';
import { UserModule } from './use-cases/user/user-use-case.module';
import { UserRepositoryModule } from './devices/user-repository.module';
import { AuthModule } from './use-cases/authentication/auth.module';
import { CompanyModule } from './use-cases/company/company.module';
import { CompanyRepositoryModule } from './devices/company-repository.module';
import { EmployeeMongoRepositoryModule } from './devices/employee-repository.module';

@Module({
  imports: [UserModule, UserRepositoryModule, CompanyRepositoryModule, EmployeeMongoRepositoryModule, AuthModule, CompanyModule]
})
export class AppModule {}
