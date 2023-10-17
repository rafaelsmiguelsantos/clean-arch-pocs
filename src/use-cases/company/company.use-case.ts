import { UserRepository } from "src/use-cases/ports/user-repository";
import { UseCase } from "src/use-cases/ports/use-case";
import { IMapper } from "src/use-cases/ports/imapper";
import { ValidationError } from "src/entities/RegisterError";
import { Company } from "src/entities/Company";
import { CompanyRequestDTO, CompanyResponseDTO } from "../dto/company-dto";
import ICompanyRepository from "../ports/company-repository";

export class CreateCompanyUseCase implements UseCase<CompanyRequestDTO, CompanyResponseDTO> {
	constructor(
		private companyRepository: ICompanyRepository,
		private userRepository: UserRepository,
		private mapper: IMapper<CompanyRequestDTO, Company>
	) { }

	async execute(companyDTO: CompanyRequestDTO): Promise<CompanyResponseDTO> {
		// 1. Verificar se o userId fornecido corresponde a um usuário existente no sistema.
		const existingUser = await this.userRepository.findById(companyDTO.userId);
		if (!existingUser) {
			throw new ValidationError("User does not exist.");
		}

		const existingCompany = await this.companyRepository.findByCNPJ(companyDTO.cnpj);
if (existingCompany) {
    throw new ValidationError("A company with this CNPJ already exists.");
}

		// 2. Valide os dados da empresa e do endereço.
		const companyOrError = this.mapper.toDomain(companyDTO);
		if (companyOrError.failure) {
			throw companyOrError.failure;
		}

		const companyEntity = companyOrError.success;

		const convertCompanyRequestDTO = this.toDTO(companyEntity)

		// 3. Se os dados forem válidos, crie a empresa e associe-a ao usuário.
		const createdCompany = await this.companyRepository.insert(convertCompanyRequestDTO);

		if (!createdCompany || !createdCompany.id) {
			throw new Error("Failed to create the company.");
		}

		// 4. Retorne a empresa criada como resposta.
		return createdCompany;
	}

	toDTO(company: Company): CompanyRequestDTO {
		return {
			id: company.id,
			name: company.name,  // Aqui supomos que o FullName tem uma representação em string que pode ser diretamente atribuída.
			fictitiousName: company.fictitiousName,
			phone: company.phone.corporatePhone,  // Aqui supomos que PhoneNumber tem uma representação em string.
			address: {
				city: company.address.city,
				state: company.address.state,
				street: company.address.street,
				cep: company.address.cep
			},
			priorityLevel: company.priorityLevel,
			userId: company.userId,
			emailCorporate: company.emailCorporate.getValue(),
			cnpj: company.cnpj
		};
	}
}
