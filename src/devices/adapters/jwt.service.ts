import { Injectable } from "@nestjs/common";
import { TokenService } from "src/use-cases/ports/token-service.interface";
import * as jwt from 'jsonwebtoken';  // Não esqueça de importar a biblioteca

@Injectable()
export class JWTTokenService implements TokenService {
  private readonly JWT_SECRET_KEY = 'YOUR_SECRET_KEY'; // Use environment variable
  private readonly EXPIRATION_TIME = '1h'; // Por exemplo, 1 hora. Ajuste conforme necessário.

  async generateToken(payload: any): Promise<{ token: string, expiresIn: number }> {
    return new Promise((resolve, reject) => {
      jwt.sign(payload, this.JWT_SECRET_KEY, { expiresIn: this.EXPIRATION_TIME }, (err, token) => {
        if (err) {
          reject(err);
          return;
        }

        const decoded = jwt.decode(token);
        if (typeof decoded !== 'string' && decoded.hasOwnProperty('exp') && decoded.hasOwnProperty('iat')) {
          const expiresIn = decoded.exp - decoded.iat;
          resolve({ token, expiresIn });
        } else {
          reject(new Error('Failed to generate a valid token.'));
        }
      });
    });
  }

  async validateToken(token: string): Promise<any> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, this.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(decoded);
      });
    });
  }
}
