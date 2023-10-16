import { EmailAddress } from "src/entities/EmailAddress";
import { FullName } from "src/entities/FullName";
import { ExistingUserError, PasswordMismatchError } from "src/entities/RegisterError";
import { Password } from "src/entities/Password"; // Importação da entidade Password
import { User } from "src/entities/User";
import { UserRepository } from "src/use-cases/ports/user-repository";
import { UserRequestDTO } from "src/use-cases/dto/user-dto";
import { RegisterUserUseCase } from "src/use-cases/user/register-use-case";
import { IMapper } from "src/use-cases/ports/imapper";
import { IHasher } from "src/use-cases/ports/hasher";

describe('RegisterUserUseCase', () => {
  let sut: RegisterUserUseCase;
  let userRepositoryStub: Partial<UserRepository>;
  let userMapperStub: Partial<IMapper<UserRequestDTO, User>>;
  let defaultDTO: UserRequestDTO;
  let hasherStub: Partial<IHasher>; // Adicionando o stub do hasher

  beforeEach(async () => {
    defaultDTO = {
      firstName: 'John',
      lastName: 'David',
      email: 'john.d.doe@example.com',
      password: 'securePassword123!',  // Adicionando campo de senha
      confirmPassword: 'securePassword123!'  // Adicionando confirmação de senha
    };

    userRepositoryStub = {
      insertWithHashedPassword: async (user: User) => user,
      findByEmail: async (email: string) => null
    };

    userMapperStub = {
      toDomain: (dto: UserRequestDTO) => {
        const fullName = new FullName(dto.firstName, dto.lastName, dto.middleName);
        const email = new EmailAddress(dto.email);
        const password = new Password(dto.password); // Mapeando o campo de senha
        return { success: new User(fullName, email, password) };  // Adicionando o campo de senha
      }
    };

    hasherStub = {
      hash: async (password: string) => password,
      compare: async (password: string, hash: string) => password === hash
    };

    sut = new RegisterUserUseCase(userRepositoryStub as UserRepository, userMapperStub as IMapper<UserRequestDTO, User>, hasherStub as IHasher);
  });

  const createUserFromDTO = (dto: UserRequestDTO) => {
    return new User(
      new FullName(dto.firstName, dto.lastName),
      new EmailAddress(dto.email),
      new Password(dto.password) // Adicionando o campo de senha
    );
  };

  describe('Successful registration', () => {
    it('should register a new user successfully', async () => {
      const result = await sut.execute(defaultDTO);
      expect(result).toEqual(createUserFromDTO(defaultDTO));
    });
  });

  describe('Failure scenarios', () => {
    it('should not register a user with an already existing email', async () => {
      userRepositoryStub.findByEmail = async () => createUserFromDTO(defaultDTO);
      await expect(sut.execute(defaultDTO)).rejects.toThrow(ExistingUserError);
    });

    it('should throw an error when DTO mapping fails', async () => {
      userMapperStub.toDomain = () => ({ failure: new Error("Failed to map DTO to domain") });
      await expect(sut.execute(defaultDTO)).rejects.toThrowError("Failed to map DTO to domain");
    });

    it('should throw an error when unable to register the user', async () => {
      userRepositoryStub.findByEmail = jest.fn().mockResolvedValue(null);
      userMapperStub.toDomain = jest.fn().mockReturnValue({ success: createUserFromDTO(defaultDTO) });
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
