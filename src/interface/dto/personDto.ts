export interface PersonResponse {
	id: string;
}

export class PersonResponseDTO {
	firstName: string;
	lastName: string;
	middleName?: string;
	email: string;
	cellPhone?: string;
	homePhone?: string;
	corporatePhone: string;
	jobTitle: string;
	name: string;
	startDate: Date;
	employeeID: string;
	userName: string;
	dateOfBirth: Date;
	gender: string;
	nationality: string;
	memberOf: string[];
	role: string;
	notes: string;
	prefix?: string;
	suffix?: string;
	street: string;
	city: string;
	state: string;
	postalCode: string;
	country: string;
	endDate?: Date;
	profilePicture?: any;
}

export class PersonRequestDTO {
	firstName: string;
	lastName: string;
	middleName?: string;
	email: string;
	cellPhone?: string;
	homePhone?: string;
	corporatePhone: string;
	jobTitle: string;
	name: string;
	startDate: Date;
	employeeID: string;
	userName: string;
	dateOfBirth: Date;
	gender: string;
	nationality: string;
	memberOf: string[];
	role: string;
	notes: string;
	prefix?: string;
	suffix?: string;
	street: string;
	city: string;
	state: string;
	postalCode: string;
	country: string;
	endDate?: Date;
	profilePicture?: any;
}