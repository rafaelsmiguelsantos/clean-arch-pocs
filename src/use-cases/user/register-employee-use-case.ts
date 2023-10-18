import { UseCase } from "src/use-cases/ports/use-case";
import { IMapper } from "src/use-cases/ports/imapper";
import { ExistingUserError, PasswordMismatchError } from "src/entities/RegisterError";
import { EmployeeRequestDTO, EmployeeResponseDTO } from "../dto/employee-dto";
import { IHasher } from "../ports/hasher";
import { User } from "src/entities/User";
import ICompanyRepository from "../ports/company-repository";
import { EmployeeRepository } from "../ports/employee-repository";
import { Employee } from "src/entities/Employee";

export class RegisterEmployeeUseCase implements UseCase<EmployeeRequestDTO, EmployeeResponseDTO> {
	constructor(
		private employeeRepository: EmployeeRepository,
		private companyRepository: ICompanyRepository,
		private mapper: IMapper<EmployeeRequestDTO, Employee>,
		private hasher: IHasher
	) { }

	async execute(employeeDTO: EmployeeRequestDTO): Promise<EmployeeResponseDTO> {
		if (employeeDTO.password !== employeeDTO.confirmPassword) {
			throw new PasswordMismatchError('Passwords do not match.');
		}

		const companyExists = await this.companyRepository.findById(employeeDTO.companyId);
		if (!companyExists) {	
			throw new Error("The provided company does not exist.");
		}

		const result = this.mapper.toDomain(employeeDTO);

		if (result.failure) {
			throw result.failure;
		}

		const employeeEntity = result.success;

		const existingEmployee = await this.employeeRepository.findByEmail(employeeEntity.getEmail().getValue());
		if (existingEmployee) {
			throw new ExistingUserError('Employee already exists with this email');
		}
		const hashedPassword = await this.hasher.hash(employeeEntity.getPassword().getValue());

		const registeredEmployee = await this.employeeRepository.insert(employeeEntity, hashedPassword);

		if (!registeredEmployee || !registeredEmployee.id) {
			throw new Error("Failed to register the employee.");
		}

		return registeredEmployee;
	}

}
