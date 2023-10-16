export interface UserResponse {
	id: string;
}

export class UserResponseDTO {
	id: string;
	firstName: string;
	lastName: string;
	middleName?: string;
	email: string;
}

export class UserRequestDTO {
	firstName: string;
	lastName: string;
	middleName?: string;
	email: string;
}