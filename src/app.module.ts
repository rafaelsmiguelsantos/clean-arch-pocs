import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './use-cases/user/user-use-case.module';
import { UserRepositoryModule } from './devices/user-repository.module';

@Module({
  imports: [UserModule, UserRepositoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
