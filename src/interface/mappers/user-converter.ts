import { User } from "src/entities/User";
import { UserData } from "../../devices/dto/user-data";

export function userToDTO(user: User, hashedPassword): UserData {
	return {
		firstName: user.getName().firstName,
		lastName: user.getName().lastName,
		middleName: user.getName().middleName,
		email: user.getEmail().getValue(),
    password: hashedPassword,
		phones: user.getPhones().map(phone => ({
			cellPhone: phone.cellPhone,
			homePhone: phone.homePhone,
			corporatePhone: phone.corporatePhone
		})),
		roles: user.getRole()
	};
}
