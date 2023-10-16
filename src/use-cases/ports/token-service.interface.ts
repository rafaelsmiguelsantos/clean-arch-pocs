export interface TokenService {
  generateToken(payload: any): Promise<{ token: string, expiresIn: number }>;
  validateToken(token: string): Promise<any>;
}