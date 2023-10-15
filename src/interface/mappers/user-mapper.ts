import { EmailAddress } from "src/entities/EmailAddress";
import { FullName } from "src/entities/FullName";
import { Either, right, left } from "../../shared/either";
import { IMapper } from "src/use-cases/ports/imapper";
import { User } from "src/entities/User";
import { UserRequestDTO } from "src/use-cases/dto/user-dto";

export class UserMapper implements IMapper<UserRequestDTO, User> {
	 toDomain(personDTO: UserRequestDTO):  Either<Error, User> {
		try {
			const fullName = new FullName(personDTO.firstName, personDTO.middleName, personDTO.lastName);
			const email = new EmailAddress(personDTO.email);

			const person = new User(
				fullName,
				email,
			);

			return right(person);
		} catch (error) {
			return left(error);
		}
	}
}