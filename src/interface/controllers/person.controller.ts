import { Body, Controller, Post, HttpCode, Inject } from '@nestjs/common';
import { UseCase } from 'src/use-cases/ports/use-case';
import { Either } from 'src/shared/either'; 
import { ErrorHandler } from 'src/shared/error-handler';
import { UserRequestDTO } from 'src/use-cases/dto/user-dto';
import { UserDTO } from '../dto/user-converter';

@Controller('user')
export class UserController {
	constructor(
		@Inject('REGISTER_USER_USECASE') private readonly registerUser: UseCase<UserRequestDTO, Either<Error, UserDTO>>
	) {}

	@Post('register')
	@HttpCode(200)
	async register(@Body() user: UserRequestDTO): Promise<UserDTO> {

		const result = await this.registerUser.execute(user);
		if (result.isLeft()) {
			ErrorHandler.handle(result.value);
		}

		return result.value;
	}
}

