import { EmailAddress } from "src/entities/EmailAddress";
import { FullName } from "src/entities/FullName";
import { ExistingUserError, PasswordMismatchError } from "src/entities/RegisterError";
import { Password } from "src/entities/Password";
import { User } from "src/entities/User";
import { UserRepository } from "src/use-cases/ports/user-repository";
import { UserRequestDTO, UserResponseDTO } from "src/use-cases/dto/user-dto";
import { RegisterUserUseCase } from "src/use-cases/user/register-use-case";
import { IMapper } from "src/use-cases/ports/imapper";
import { IHasher } from "src/use-cases/ports/hasher";
import { PhoneNumber } from "src/entities/PhoneNumber";

describe('RegisterUserUseCase', () => {
  let sut: RegisterUserUseCase;
  let userRepositoryStub: Partial<UserRepository>;
  let userMapperStub: Partial<IMapper<UserRequestDTO, User>>;
  let defaultDTO: UserRequestDTO;
  let hasherStub: Partial<IHasher>;

  beforeEach(async () => {
    defaultDTO = {
      firstName: 'John',
      lastName: 'David',
      email: 'john.d.doe@example.com',
      password: 'securePassword123!',
      confirmPassword: 'securePassword123!',
      phone: [
        {
          cellPhone: '(21) 54321-9876',
          homePhone: '(33) 4321-5678',
          corporatePhone: '(44) 1234-5678'
        }
      ]
    };

    userRepositoryStub = {
      insertWithHashedPassword: async (user: UserRequestDTO, hashedPassword: string): Promise<UserResponseDTO> => {
        return {
          id: "mock-id", // você pode gerar um id mock aqui, como uma string estática ou usando algum gerador
          firstName: user.firstName,
          lastName: user.lastName,
          middleName: user.middleName,
          email: user.email,
          phone: user.phone
        };
      },
      findByEmail: async (email: string) => null
    };



    userMapperStub = {
      toDomain: (dto: UserRequestDTO) => {
        const fullName = new FullName(dto.firstName, dto.lastName, dto.middleName);
        const email = new EmailAddress(dto.email);
        const password = new Password(dto.password);
        // Mapeando a lista de phones do DTO para uma lista de PhoneNumber
        const phones = dto.phone.map(phoneDTO => {
          return new PhoneNumber(phoneDTO.corporatePhone, phoneDTO.cellPhone, phoneDTO.homePhone);
        });
        return { success: new User(fullName, email, password, phones) };
      }
    };

    hasherStub = {
      hash: async (password: string) => password,
      compare: async (password: string, hash: string) => password === hash
    };

    sut = new RegisterUserUseCase(userRepositoryStub as UserRepository, userMapperStub as IMapper<UserRequestDTO, User>, hasherStub as IHasher);
  });

  const createUserResponseFromDTO = (dto: UserRequestDTO): UserResponseDTO => {
    return {
      id: 'mock-id', // Mock an ID since it's not present in the DTO
      firstName: dto.firstName,
      lastName: dto.lastName,
      middleName: dto.middleName,
      email: dto.email,
      phone: dto.phone
    };
  };

  describe('Successful registration', () => {
    it('should register a new user successfully', async () => {
      const result = await sut.execute(defaultDTO);
      expect(result).toEqual(createUserResponseFromDTO(defaultDTO));
    });
  });

  describe('Failure scenarios', () => {
    it('should not register a user with an already existing email', async () => {
      userRepositoryStub.findByEmail = async () => createUserResponseFromDTO(defaultDTO);
      await expect(sut.execute(defaultDTO)).rejects.toThrow(ExistingUserError);
    });


    it('should throw an error when DTO mapping fails', async () => {
      userMapperStub.toDomain = () => ({ failure: new Error("Failed to map DTO to domain") });
      await expect(sut.execute(defaultDTO)).rejects.toThrowError("Failed to map DTO to domain");
    });

    it('should throw an error when unable to register the user', async () => {
      userRepositoryStub.findByEmail = jest.fn().mockResolvedValue(null);

      const phones = defaultDTO.phone.map(p => new PhoneNumber(p.corporatePhone, p.cellPhone, p.homePhone));

      userMapperStub.toDomain = jest.fn().mockReturnValue({
        success: new User(
          new FullName(defaultDTO.firstName, defaultDTO.lastName),
          new EmailAddress(defaultDTO.email),
          new Password(defaultDTO.password),
          phones
        )
      });

      userRepositoryStub.insertWithHashedPassword = jest.fn().mockResolvedValue(null);

      await expect(sut.execute(defaultDTO)).rejects.toThrowError("Failed to register the user.");
    });


    it('should throw PasswordMismatchError when password and confirmPassword do not match', async () => {
      const mismatchedDTO: UserRequestDTO = {
        ...defaultDTO,
        confirmPassword: 'differentPassword'
      };

      await expect(sut.execute(mismatchedDTO)).rejects.toThrow(PasswordMismatchError);
      await expect(sut.execute(mismatchedDTO)).rejects.toThrow('Passwords do not match.');
    });
  });
});
