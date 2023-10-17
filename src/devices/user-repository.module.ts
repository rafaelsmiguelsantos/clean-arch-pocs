import { Module } from '@nestjs/common';
import { MongodbModule } from './mongodb.module';
import { UserMongoRepository } from './db/user-mongodb-repository';

@Module({
  imports: [MongodbModule],
  providers: [{
    provide: UserMongoRepository,
    useClass: UserMongoRepository
  }],
  exports: [UserMongoRepository], 
})
export class UserRepositoryModule {}
