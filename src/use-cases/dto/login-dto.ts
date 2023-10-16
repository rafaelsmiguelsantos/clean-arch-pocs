// login-request.dto.ts

export class LoginRequestDTO {
  email: string;
  password: string;
}

// login-response.dto.ts

export class LoginResponseDTO {
  token: string;        // JWT token
  expiresIn: number;    // Token expiration time, usually in seconds or milliseconds
  userId?: string;       // Optional, if you want to return the user's ID
  email?: string;        // Optional, if you want to return the user's email
}
