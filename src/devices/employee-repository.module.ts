import { Module } from '@nestjs/common';
import { MongodbModule } from './mongodb.module';
import { EmployeeMongoRepository } from './db/employee-mongo-repository';

@Module({
  imports: [MongodbModule],
  providers: [{
    provide: 'EmployeeMongoRepository',
    useClass: EmployeeMongoRepository
  }],
  exports: ['EmployeeMongoRepository'], 
})
export class EmployeeMongoRepositoryModule {}

