import { ObjectId } from "mongodb";
import { Roles } from "src/entities/roles";
import { Phones } from "src/use-cases/dto/user-dto";

export class EmployeeData {
  _id?: string | ObjectId; 
	firstName: string;
	lastName: string;
	middleName?: string;
	email: string;
	companyId: string;
	password?: string;
	phone: Phones[];
	roles?: Roles;
	userId: string;
}