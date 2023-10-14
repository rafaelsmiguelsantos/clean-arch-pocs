import { Body, Controller, Post, HttpCode, Inject, ForbiddenException, BadRequestException } from '@nestjs/common';
import { UseCase } from 'src/use-cases/ports/use-case';
import { PersonRequestDTO, PersonResponse } from '../dto/personDto';
import { Either } from 'src/shared/either'; 
import { ExistingUserError, InvalidPhoneFormatException, ValidationError } from 'src/entities/RegisterError';
import { ErrorHandler } from 'src/shared/error-handler';

@Controller('person')
export class PersonController {
	constructor(
		@Inject('REGISTER_USER_USECASE') private readonly registerUser: UseCase<PersonRequestDTO, Either<Error, PersonResponse>>
	) {}

	@Post('register')
	@HttpCode(200)
	async register(@Body() person: PersonRequestDTO): Promise<PersonResponse> {
		const result = await this.registerUser.execute(person);
	
		if (result.isLeft()) {
			ErrorHandler.handle(result.value);
		}
	
		return result.value;
	}
}
