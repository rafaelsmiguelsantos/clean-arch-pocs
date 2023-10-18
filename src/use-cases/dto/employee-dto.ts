export interface EmployeeRequestDTO {
  id?: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword?: string;
  companyId: string;
  phone: Phones[];
  userId?: string;
}


export interface EmployeeResponseDTO {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  companyId: string;
}

export class Phones {
	cellPhone?: string;
	homePhone?: string;
	corporatePhone: string;
}

