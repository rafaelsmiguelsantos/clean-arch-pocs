import { Body, Controller, Post, HttpCode, Inject, Get, Param, Req } from '@nestjs/common';
import { UseCase } from 'src/use-cases/ports/use-case';
import { ErrorHandler } from 'src/shared/error-handler';
import { UserRequestDTO, UserResponseDTO } from 'src/use-cases/dto/user-dto';
import { EmployeeRequestDTO, EmployeeResponseDTO } from 'src/use-cases/dto/employee-dto';

@Controller('user')
export class UserController {
	constructor(
		@Inject('REGISTER_USER_USECASE') private readonly registerUser: UseCase<UserRequestDTO, UserResponseDTO>,
		@Inject('GET_USER_BY_ID_USECASE') private readonly getUserById: UseCase<string, UserResponseDTO>,
		@Inject('REGISTER_EMPLOYEE_USECASE') private readonly registerEmployee: UseCase<EmployeeRequestDTO, EmployeeResponseDTO>
	) { }

	@Post('register')
	@HttpCode(201)
	async register(@Body() user: UserRequestDTO): Promise<UserResponseDTO> {
		try {
			const result = await this.registerUser.execute(user);
			return result;
		} catch (error) {
			ErrorHandler.handle(error);
		}
	}

	@Get(':id')
	async getById(@Param('id') id: string): Promise<UserResponseDTO> {
		try {
			const result = await this.getUserById.execute(id);
			return result;
		} catch (error) {
			ErrorHandler.handle(error);
		}
	}

	@Post('register-employee')
	@HttpCode(201)
	async registerNewEmployee(@Body() employee: EmployeeRequestDTO, @Req() req: any): Promise<EmployeeResponseDTO> {
		try {
			employee.userId = req.userId;
			const result = await this.registerEmployee.execute(employee);
			return result;
		} catch (error) {
			ErrorHandler.handle(error);
		}
	}
}
