import { EmailAddress } from "src/entities/EmailAddress";
import { FullName } from "src/entities/FullName";
import { IMapper } from "src/use-cases/ports/imapper";
import { User } from "src/entities/User";
import { UserRequestDTO } from "src/use-cases/dto/user-dto";
import { Password } from "src/entities/Password";

export class UserMapper implements IMapper<UserRequestDTO, User> {
  toDomain(personDTO: UserRequestDTO) {
    try {
      const fullName = new FullName(personDTO.firstName, personDTO.middleName, personDTO.lastName);
      const email = new EmailAddress(personDTO.email);
      const password = new Password(personDTO.password);

      const person = new User(
        fullName,
        email,
        password,
      );

      return { success: person };
    } catch (error) {
      return { failure: error };
    }
  }
}

