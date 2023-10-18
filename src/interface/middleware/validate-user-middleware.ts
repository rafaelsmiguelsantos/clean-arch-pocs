import { Inject, Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { EmployeeRepository } from 'src/use-cases/ports/employee-repository';
export const EMPLOYEE_REPOSITORY_TOKEN = 'EMPLOYEE_REPOSITORY_TOKEN';

@Injectable()
export class ValidateUserIdMiddleware implements NestMiddleware {
  constructor(@Inject(EMPLOYEE_REPOSITORY_TOKEN) private readonly employeeRepository: EmployeeRepository) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new NotFoundException('Token não fornecido');
    }

    try {
      const decodedPayload = jwt.verify(token, process.env.SECRET_KEY || 'YOUR_SECRET_KEY');

      if (typeof decodedPayload === 'object' && (decodedPayload as MyJwtPayload).userId) {
        const payload = decodedPayload as MyJwtPayload;
        const userExists = await this.employeeRepository.findById(payload.userId);
        
        req.userId = payload.userId;

        if (!userExists) {
          throw new NotFoundException('ID de usuário no token não é válido');
        }
      } else {
        throw new Error('Token inválido');
      }

      next();
    } catch (error) {
      // Se algo der errado na verificação, jogue o erro para ser tratado pelo interceptor.
      throw error;
    }
  }
}

export interface MyJwtPayload extends jwt.JwtPayload {
  userId: string;
}
