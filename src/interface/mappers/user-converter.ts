import { EmailAddress } from "src/entities/EmailAddress";
import { FullName } from "src/entities/FullName";
import { User } from "src/entities/User";
import { UserData } from "../dto/user-data";

export function userToDTO(user: User): UserData {
	return {
		firstName: user.getName().firstName,
		lastName: user.getName().lastName,
		middleName: user.getName().middleName,
		email: user.getEmail().getValue()
	};
}

export function dtoToUser(dto: UserData): User {
	const fullName = new FullName(dto.firstName, dto.lastName, dto.middleName);
	const email = new EmailAddress(dto.email);
	const user = new User(fullName, email);
	if (dto._id) {
		user.setId(dto._id.toString());
	}
	return user;
}
