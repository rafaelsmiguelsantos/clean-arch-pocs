import { UserNotFound } from "src/entities/RegisterError";
import { UserRepository } from "src/use-cases/ports/user-repository";
import { GetUserByIdUseCase } from "src/use-cases/user/get-user-by-id-use-case";
import { EmailAddress } from "src/entities/EmailAddress";
import { FullName } from "src/entities/FullName";
import { User } from "src/entities/User";

describe('GetUserByIdUseCase', () => {
  let sut: GetUserByIdUseCase;
  let userRepositoryStub: Partial<UserRepository>;

  beforeEach(async () => {
    userRepositoryStub = {
      findById: async (id: string) => null
    };

    sut = new GetUserByIdUseCase(userRepositoryStub as UserRepository);
  });

  it('deve retornar um usuário quando encontrado pelo ID', async () => {
    const userId = '652b6b4983aaf912c340a371';
    
    const expectedUser = new User(new FullName('Jane', 'Doe'), new EmailAddress('jane.doe@example.com'));
    userRepositoryStub.findById = async (id: string) => expectedUser;

    const result = await sut.execute(userId);
    expect(result).toEqual(expectedUser);
  });

  it('deve lançar um UserNotFound erro quando o usuário não é encontrado', async () => {
    const userId = 'nonexistentUserId';

    await expect(sut.execute(userId)).rejects.toThrow(UserNotFound);
  });
});
