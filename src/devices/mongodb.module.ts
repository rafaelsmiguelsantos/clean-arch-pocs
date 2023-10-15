import { Module, Global } from '@nestjs/common';
import { connectToMongoDB, mongoClient } from './providers/mongo-client-provider';

@Global()
@Module({
  providers: [
    {
      provide: 'MONGO_CLIENT',
      useValue: mongoClient,
    },
    {
      provide: 'CONNECT_TO_MONGO',
      useValue: connectToMongoDB,
    },
  ],
  exports: ['MONGO_CLIENT', 'CONNECT_TO_MONGO'],
})
export class MongodbModule {}
