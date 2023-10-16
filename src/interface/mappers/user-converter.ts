import { UserData } from "../../devices/dto/user-data";
import { UserRequestDTO } from "src/use-cases/dto/user-dto";

export function userToDTO(user: UserRequestDTO, hashedPassword): UserData {
	return {
		firstName: user.firstName,
		lastName: user.lastName,
		middleName: user.middleName,
		email: user.email,
    password: hashedPassword,
		phones: user.phone
	};
}
