import { EmailAddress } from "src/entities/EmailAddress";
import { FullName } from "src/entities/FullName";
import { ExistingUserError } from "src/entities/RegisterError";
import { User } from "src/entities/User";
import { UserRepository } from "src/use-cases/ports/user-repository";
import { UserRequestDTO } from "src/use-cases/dto/user-dto";
import { RegisterUserUseCase } from "src/use-cases/user/register-use-case";
import { IMapper } from "src/use-cases/ports/imapper";

describe('RegisterUserUseCase', () => {
  let sut: RegisterUserUseCase;
  let userRepositoryStub: Partial<UserRepository>;
  let userMapperStub: Partial<IMapper<UserRequestDTO, User>>;
  let defaultDTO: UserRequestDTO;

  beforeEach(async () => {
    defaultDTO = {
      firstName: 'John',
      lastName: 'David',
      email: 'john.d.doe@example.com'
    };

    userRepositoryStub = {
      insert: async (user: User) => user,
      findByEmail: async (email: string) => null
    };

    userMapperStub = {
      toDomain: (dto: UserRequestDTO) => {
        const fullName = new FullName(dto.firstName, dto.lastName, dto.middleName);
        const email = new EmailAddress(dto.email);
        return { success: new User(fullName, email) };
      }
    };

    sut = new RegisterUserUseCase(userRepositoryStub as UserRepository, userMapperStub as IMapper<UserRequestDTO, User>);
  });

  const createUserFromDTO = (dto: UserRequestDTO) => {
    return new User(new FullName(dto.firstName, dto.lastName), new EmailAddress(dto.email));
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
      userRepositoryStub.insert = jest.fn().mockResolvedValue(null);
      await expect(sut.execute(defaultDTO)).rejects.toThrowError("Failed to register the user.");
    });
  });
});
