import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './use-cases/user/user-use-case.module';
import { UserRepositoryModule } from './devices/user-repository.module';
import { AuthModule } from './use-cases/authentication/auth.module';
import { CompanyModule } from './use-cases/company/company.module';
import { CompanyRepositoryModule } from './devices/company-repository.module';

@Module({
  imports: [UserModule, UserRepositoryModule, CompanyRepositoryModule, AuthModule, CompanyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
