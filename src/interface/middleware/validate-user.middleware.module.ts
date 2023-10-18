import { Module } from '@nestjs/common';
import { EmployeeMongoRepository } from 'src/devices/db/employee-mongo-repository';
import { EMPLOYEE_REPOSITORY_TOKEN, ValidateUserIdMiddleware } from 'src/interface/middleware/validate-user-middleware';

@Module({
  providers: [
    ValidateUserIdMiddleware,
    {
      provide: EMPLOYEE_REPOSITORY_TOKEN,
      useClass: EmployeeMongoRepository
    }
  ],
  exports: [ValidateUserIdMiddleware, EMPLOYEE_REPOSITORY_TOKEN],
})
export class ValidateUserIdMiddlewareModule {}