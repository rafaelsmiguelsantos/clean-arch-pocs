import { Body, Controller, Post, HttpCode, Inject, Req } from '@nestjs/common';
import { UseCase } from 'src/use-cases/ports/use-case';
import { ErrorHandler } from 'src/shared/error-handler';
import { EmployeeRequestDTO, EmployeeResponseDTO } from 'src/use-cases/dto/employee-dto';

@Controller('employee')
export class EmployeeController {
	constructor(
		@Inject('REGISTER_EMPLOYEE_USECASE') private readonly registerEmployee: UseCase<EmployeeRequestDTO, EmployeeResponseDTO>
	) { }

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
