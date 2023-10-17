import { Module } from '@nestjs/common';
import { MongodbModule } from './mongodb.module';
import { CompanyMongoRepository } from './db/company-repository';

@Module({
  imports: [MongodbModule],
  providers: [{
    provide: CompanyMongoRepository,
    useClass: CompanyMongoRepository
  }],
  exports: [CompanyMongoRepository], 
})
export class CompanyRepositoryModule {}
