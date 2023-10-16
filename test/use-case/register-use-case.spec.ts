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

  beforeEach(async () => {
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

  it('deve registrar um novo usuário com sucesso', async () => {
    const dto: UserRequestDTO = {
      firstName: 'John',
      lastName: 'David',
      email: 'john.d.doe@example.com'
    };
    
    const result = await sut.execute(dto);
    
    const fullName = new FullName('John', 'David');
    const emailAddress = new EmailAddress('john.d.doe@example.com');
    const expectedUser = new User(fullName, emailAddress);

    expect(result).toEqual(expectedUser);
  });

  it('não deve registrar um usuário com um email já existente', async () => {
    const dto: UserRequestDTO = {
      firstName: 'John',
      lastName: 'David',
      email: 'john.d.doe@example.com'
    };
    
    userRepositoryStub.findByEmail = async (email: string) => {
      const existingFullName = new FullName('Jane', 'David', 'Smith');
      const existingEmail = new EmailAddress('john.d.doe@example.com');
      return new User(existingFullName, existingEmail);
    };

    await expect(sut.execute(dto)).rejects.toThrow(ExistingUserError);
  });
});
