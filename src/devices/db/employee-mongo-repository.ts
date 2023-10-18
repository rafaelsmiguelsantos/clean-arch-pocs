import { Injectable, Inject } from '@nestjs/common';
import { MongoClient, Collection, ObjectId } from 'mongodb';
import { EmployeeResponseDTO } from 'src/use-cases/dto/employee-dto';
import { EmployeeRepository } from 'src/use-cases/ports/employee-repository';
import { EmployeeData } from '../dto/employee-data';
import { Employee } from 'src/entities/Employee';

@Injectable()
export class EmployeeMongoRepository implements EmployeeRepository {
	private readonly client: MongoClient;
	private get collection(): Collection<EmployeeData> {
		return this.client.db('clean-arch').collection('user');
	}

	constructor(@Inject('MONGO_CLIENT') client: MongoClient) {
		this.client = client;
	}

	async insert(employee: Employee, hashedPassword: string): Promise<EmployeeResponseDTO> {
		const employeeData = this.employeeToDTO(employee, hashedPassword);

		const result = await this.collection.insertOne(employeeData);
		if (!result.acknowledged) {
			throw new Error('Failed to insert employee.');
		}

		const idString: string = (result.insertedId instanceof ObjectId) ? result.insertedId.toHexString() : String(result.insertedId);

		return {
			id: idString,
			firstName: employee.getName().firstName,
			lastName: employee.getName().lastName,
			email: employee.getEmail().getValue(),
			companyId: employee.getCompanyId()
		};
	}

	async findByEmail(email: string): Promise<EmployeeResponseDTO | null> {
		const employeeData = await this.collection.findOne({ email });
		return employeeData ? this.employeeDataToEmployeeResponseDTO(employeeData) : null;
	}

	async findById(id: string): Promise<EmployeeResponseDTO | null> {
		const employeeData = await this.collection.findOne({ _id: new ObjectId(id) });
		return employeeData ? this.employeeDataToEmployeeResponseDTO(employeeData) : null;
	}

	private employeeToDTO(employee: Employee, hashedPassword): EmployeeData {
		return {
			firstName: employee.getName().firstName,
			lastName: employee.getName().lastName,
			email: employee.getEmail().getValue(),
			password: hashedPassword,
			companyId: employee.getCompanyId(),
			phone: employee.getPhones().map(phone => ({
				cellPhone: phone.cellPhone,
				homePhone: phone.homePhone,
				corporatePhone: phone.corporatePhone
			})),
			userId: employee.getUserId()
		};
	}

	private employeeDataToEmployeeResponseDTO(employeeData: EmployeeData): EmployeeResponseDTO {
		return {
			id: typeof employeeData._id === 'string' ? employeeData._id : employeeData._id.toHexString(),
			firstName: employeeData.firstName,
			lastName: employeeData.lastName,
			email: employeeData.email,
			companyId: employeeData.companyId
		};
	}
}
