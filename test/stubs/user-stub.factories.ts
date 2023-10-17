import { EmailAddress } from "src/entities/EmailAddress";
import { FullName } from "src/entities/FullName";
import { Password } from "src/entities/Password";
import { PhoneNumber } from "src/entities/PhoneNumber";
import { User } from "src/entities/User";
import { UserRequestDTO, UserResponseDTO } from "src/use-cases/dto/user-dto";

export function createUserRepositoryStub() {
  return {
    insertWithHashedPassword: async (user: UserRequestDTO, hashedPassword: string): Promise<UserResponseDTO> => {
      return {
        id: "mock-id",
        firstName: user.firstName,
        lastName: user.lastName,
        middleName: user.middleName,
        email: user.email,
        phone: user.phone
      };
    },
    findByEmail: async (email: string) => null
  };
}

export function createUserMapperStub() {
  return {
    toDomain: (dto: UserRequestDTO) => {
      const fullName = new FullName(dto.firstName, dto.lastName, dto.middleName);
      const email = new EmailAddress(dto.email);
      const password = new Password(dto.password);
      const phones = dto.phone.map(phoneDTO => {
        return new PhoneNumber(phoneDTO.corporatePhone, phoneDTO.cellPhone, phoneDTO.homePhone);
      });
      return { success: new User(fullName, email, password, phones) };
    }
  };
}

export function createHasherStub() {
  return {
    hash: async (password: string) => password,
    compare: async (password: string, hash: string) => password === hash
  };
}
