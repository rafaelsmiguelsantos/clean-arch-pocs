import { Body, Controller, Post, HttpCode, Inject, Get, Param } from '@nestjs/common';
import { UseCase } from 'src/use-cases/ports/use-case';
import { ErrorHandler } from 'src/shared/error-handler';
import { UserRequestDTO, UserResponseDTO } from 'src/use-cases/dto/user-dto';
import { User } from 'src/entities/User';

@Controller('user')
export class UserController {
	constructor(
		@Inject('REGISTER_USER_USECASE') private readonly registerUser: UseCase<UserRequestDTO, User>,
		@Inject('GET_USER_BY_ID_USECASE') private readonly getUserById: UseCase<string, User>
	) { }

	@Post('register')
	@HttpCode(201)
	async register(@Body() user: UserRequestDTO): Promise<UserResponseDTO> {
		try {
			const result = await this.registerUser.execute(user);
			return this.userToResponseDTO(result);
		} catch (error) {
			ErrorHandler.handle(error);
		}
	}

	@Get(':id')  // Rota para buscar usuário por ID
	async getById(@Param('id') id: string): Promise<UserResponseDTO> {  // O ID é obtido da URL como parâmetro
		try {
			const result = await this.getUserById.execute(id);  // Chame o use-case de busca
			return this.userToResponseDTO(result);
		} catch (error) {
			ErrorHandler.handle(error);
		}
	}

	private userToResponseDTO(user: User): UserResponseDTO {
		const name = user.getName();
		return {
			id: user.getId(),
			firstName: name.firstName,  // Usando getter
			middleName: name.middleName, // Usando getter
			lastName: name.lastName,    // Usando getter
			email: user.getEmail().getValue()  // Usando getValue() do EmailAddress
		};
	}
}
