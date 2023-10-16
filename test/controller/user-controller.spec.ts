import { Test, TestingModule } from '@nestjs/testing';
import { UseCase } from 'src/use-cases/ports/use-case';
import { User } from 'src/entities/User';
import { FullName } from 'src/entities/FullName';
import { EmailAddress } from 'src/entities/EmailAddress';
import { Password } from 'src/entities/Password'; // Importando a entidade Password
import { ExistingUserError, UserNotFound } from 'src/entities/RegisterError';
import { UserController } from 'src/interface/controllers/user.controller';
import { UserRequestDTO, UserResponseDTO } from 'src/use-cases/dto/user-dto';
import { BadRequestException } from '@nestjs/common';

describe('UserController', () => {
  let controller: UserController;
  let registerUserMock: jest.Mocked<UseCase<UserRequestDTO, User>>;
  let getUserByIdMock: jest.Mocked<UseCase<string, UserResponseDTO>>;

  beforeEach(async () => {
    const executeMock = jest.fn();

    registerUserMock = { execute: executeMock } as jest.Mocked<UseCase<UserRequestDTO, User>>;
    getUserByIdMock = { execute: executeMock } as jest.Mocked<UseCase<string, UserResponseDTO>>;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        { provide: 'REGISTER_USER_USECASE', useValue: registerUserMock },
        { provide: 'GET_USER_BY_ID_USECASE', useValue: getUserByIdMock },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  // Test for successful user registration
  it('should register a user successfully', async () => {
    const userDto: UserRequestDTO = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'securePassword123!',
      confirmPassword: 'securePassword123!'
    };
    const user = new User(
      new FullName(userDto.firstName, userDto.lastName),
      new EmailAddress(userDto.email),
      new Password(userDto.password) // Adicionando a entidade Password
    );
    registerUserMock.execute.mockResolvedValueOnce(user);
    const result = await controller.register(userDto);
    expect(result).toMatchObject({
      firstName: userDto.firstName,
      lastName: userDto.lastName,
      email: userDto.email
    });
  });

  // Test for handling duplicate email during registration
  it('should throw BadRequestException on duplicate email', async () => {
    const dto: UserRequestDTO = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'securePassword123',
      confirmPassword: 'securePassword123'
    };
    registerUserMock.execute.mockRejectedValueOnce(new ExistingUserError());
    await expect(controller.register(dto)).rejects.toThrow(BadRequestException);
  });

  // Test for successfully getting a user by ID
  it('should get a user by ID successfully', async () => {
    const userId = 'someUserId';
    const userResponse: UserResponseDTO = {
      id: userId,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com'
    };
    getUserByIdMock.execute.mockResolvedValueOnce(userResponse);
    const result = await controller.getById(userId);
    expect(result).toMatchObject(userResponse);
  });

  // Test for error scenario when a user by ID is not found
  it('should throw UserNotFound error if user is not found', async () => {
    const userId = 'nonExistentUserId';
    getUserByIdMock.execute.mockRejectedValueOnce(new UserNotFound());
    await expect(controller.getById(userId)).rejects.toThrowError(BadRequestException);
  });

});
