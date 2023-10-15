import { EmailAddress } from "src/entities/EmailAddress";
import { FullName } from "src/entities/FullName";
import { User } from "src/entities/User";

export function userToDTO(user: User): UserDTO {
    return {
        firstName: user.getName().firstName,
        lastName: user.getName().lastName,
        middleName: user.getName().middleName,
        email: user.getEmail().getValue()
    };
}

export function dtoToUser(dto: UserDTO): User {
    const fullName = new FullName(dto.firstName, dto.lastName, dto.middleName);
    const email = new EmailAddress(dto.email);
    return new User(fullName, email);
}

export class UserDTO {
    firstName: string;
    lastName: string;
    middleName?: string;
    email: string;
    _id?: string; // ID do MongoDB
}
