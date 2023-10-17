import { Roles } from "src/entities/roles";

export interface UserResponse {
	id: string;
}

export class UserResponseDTO {
	id: string;
	firstName: string;
	lastName: string;
	middleName?: string;
	email: string;
	password?: string;
	phone: Phones[];
	roles?: Roles;
}

export class UserRequestDTO {
	id?: string;
	firstName: string;
	lastName: string;
	middleName?: string;
	email: string;
	password?: string;
	confirmPassword?: string;
	phone: Phones[];
}

export class Phones {
	cellPhone?: string;
	homePhone?: string;
	corporatePhone: string;
}
