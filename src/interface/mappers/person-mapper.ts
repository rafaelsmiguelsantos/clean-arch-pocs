import { Address } from "src/entities/Address";
import { Department } from "src/entities/Department";
import { EmailAddress } from "src/entities/EmailAddress";
import { FullName } from "src/entities/FullName";
import { Person } from "src/entities/Person";
import { PhoneNumber } from "src/entities/PhoneNumber";
import { ProfilePicture } from "src/entities/ProfilePicture";
import { PersonRequestDTO } from "src/interface/dto/personDto";
import { Either, right, left } from "../../shared/either";
import { IMapper } from "src/use-cases/ports/imapper";

export class PersonMapper implements IMapper<PersonRequestDTO, Person> {
	 toDomain(personDTO: PersonRequestDTO):  Either<Error, Person> {
		try {
			const fullName = new FullName(personDTO.firstName, personDTO.middleName, personDTO.lastName);
			const email = new EmailAddress(personDTO.email);
			const phoneNumber = new PhoneNumber(personDTO.corporatePhone, personDTO.cellPhone, personDTO.homePhone);  // Adicionado para incluir todos os números
			const address = new Address(personDTO.street, personDTO.city, personDTO.state, personDTO.postalCode, personDTO.country);
			const department = new Department(personDTO.name);
			const profilePicture = personDTO.profilePicture ? new ProfilePicture(personDTO.profilePicture) : undefined;

			const person = new Person(
				fullName,
				email,
				phoneNumber,
				personDTO.jobTitle,
				department,
				personDTO.startDate,
				personDTO.employeeID,
				personDTO.userName,
				personDTO.dateOfBirth,
				personDTO.gender,
				personDTO.nationality,
				personDTO.memberOf,
				personDTO.role,
				personDTO.notes,
				personDTO.prefix,
				personDTO.suffix,
				address,
				personDTO.endDate,
				profilePicture
			);

			return right(person);
		} catch (error) {
			return left(error);
		}
	}
}
