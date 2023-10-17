import { EmailAddress } from "src/entities/EmailAddress";
import { FullName } from "src/entities/FullName";
import { Password } from "src/entities/Password";
import { PhoneNumber } from "src/entities/PhoneNumber";
import { User } from "src/entities/User";
import { Roles } from "src/entities/roles";
import { UserRequestDTO, UserResponseDTO } from "src/use-cases/dto/user-dto";

export function createUserRepositoryStub() {
  return {
    insert: async (user: User, hashedPassword: string): Promise<UserResponseDTO> => {
      return {
        id: "mock-id",
        firstName: user.getName().firstName,
        lastName: user.getName().lastName,
        middleName: user.getName().middleName,
        email: user.getEmail().getValue(),
        phone: user.getPhones().map(phone => ({
          cellPhone: phone.cellPhone,
          homePhone: phone.homePhone,
          corporatePhone: phone.corporatePhone
        })),
        roles: user.getRole()
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
      return { success: new User(fullName, email, password, phones, Roles.ADMIN) };
    }
  };
}

export function createHasherStub() {
  return {
    hash: async (password: string) => password,
    compare: async (password: string, hash: string) => password === hash
  };
}
