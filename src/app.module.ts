import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './use-cases/user/user-use-case.module';
import { UserRepositoryModule } from './devices/user-repository.module';
import { AuthModule } from './use-cases/authentication/auth.module';

@Module({
  imports: [UserModule, UserRepositoryModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
