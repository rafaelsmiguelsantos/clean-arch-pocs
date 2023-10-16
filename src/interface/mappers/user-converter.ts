import { EmailAddress } from "src/entities/EmailAddress";
import { FullName } from "src/entities/FullName";
import { User } from "src/entities/User";
import { UserData } from "../dto/user-data";
import { Password } from "src/entities/Password";

export function userToDTO(user: User): UserData {
	return {
		firstName: user.getName().firstName,
		lastName: user.getName().lastName,
		middleName: user.getName().middleName,
		email: user.getEmail().getValue(),
    password: user.getPassword().getValue()  // Assuming you have a getPassword method in User
	};
}

export function dtoToUser(dto: UserData): User {
	const fullName = new FullName(dto.firstName, dto.lastName, dto.middleName);
	const email = new EmailAddress(dto.email);
	const password = new Password(dto.password);  // You should instantiate the Password VO
	const user = new User(fullName, email, password);  // Adjust the User constructor accordingly
	if (dto._id) {
		user.setId(dto._id.toString());
	}
	return user;
}
