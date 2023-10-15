import { Module } from '@nestjs/common';
import { MongodbModule } from './mongodb.module';
import { UserMongoRepository } from './user-mongodb-repository';

@Module({
  imports: [MongodbModule],
  providers: [UserMongoRepository],
  exports: [UserMongoRepository],
})
export class UserRepositoryModule {}
