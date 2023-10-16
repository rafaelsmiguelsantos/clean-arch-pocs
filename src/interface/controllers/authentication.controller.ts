import { Body, Controller, Post, HttpCode, Inject } from '@nestjs/common';
import { UseCase } from 'src/use-cases/ports/use-case';
import { ErrorHandler } from 'src/shared/error-handler';
import { LoginRequestDTO, LoginResponseDTO } from 'src/use-cases/dto/login-dto';

@Controller('auth')
export class AuthController {
	constructor(
		@Inject('LOGIN_USECASE') private readonly loginUser: UseCase<LoginRequestDTO, LoginResponseDTO>
	) { }

	@Post('login')
	@HttpCode(200)
	async login(@Body() loginDto: LoginRequestDTO): Promise<{ token: string, email: string }> {
		try {
			const result: LoginResponseDTO = await this.loginUser.execute(loginDto);
			return {
				token: result.token,
				email: result.email
			};
		} catch (error) {
			ErrorHandler.handle(error);
		}
	}
}
