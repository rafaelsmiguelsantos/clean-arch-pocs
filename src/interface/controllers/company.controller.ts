import { Body, Controller, Post, HttpCode, Inject } from '@nestjs/common';
import { UseCase } from 'src/use-cases/ports/use-case';
import { ErrorHandler } from 'src/shared/error-handler';
import { CompanyRequestDTO, CompanyResponseDTO } from 'src/use-cases/dto/company-dto';

@Controller('company')
export class CompanyController {
	constructor(
		@Inject('CREATE_COMPANY_USECASE') private readonly createCompany: UseCase<CompanyRequestDTO, CompanyResponseDTO>
	) { }

	@Post('create')
	@HttpCode(201)
	async create(@Body() company: CompanyRequestDTO): Promise<CompanyResponseDTO> {
		try {
			const result = await this.createCompany.execute(company);
			return result;
		} catch (error) {
			ErrorHandler.handle(error);
		}
	}
}
