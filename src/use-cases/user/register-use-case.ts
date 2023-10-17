import { UserRepository } from "src/use-cases/ports/user-repository";
import { UseCase } from "src/use-cases/ports/use-case";
import { IMapper } from "src/use-cases/ports/imapper";
import { ExistingUserError, PasswordMismatchError } from "src/entities/RegisterError";
import { User } from "src/entities/User";
import { UserRequestDTO, UserResponseDTO } from "../dto/user-dto";
import { IHasher } from "../ports/hasher";

export class RegisterUserUseCase implements UseCase<UserRequestDTO, UserResponseDTO> {
	constructor(
		private userRepository: UserRepository,
		private mapper: IMapper<UserRequestDTO, User>,
		private hasher: IHasher
	) { }

	async execute(userDTO: UserRequestDTO): Promise<UserResponseDTO> {
		if (userDTO.password !== userDTO.confirmPassword) {
			throw new PasswordMismatchError('Passwords do not match.');
		}

		const result = this.mapper.toDomain(userDTO);

		if (result.failure) {
			throw result.failure;
		}

		const userEntity = result.success;

		const existingUser = await this.userRepository.findByEmail(userEntity.getEmail().getValue());
		if (existingUser) {
			throw new ExistingUserError('User already exists with this email');
		}
		const hashedPassword = await this.hasher.hash(userEntity.getPassword().getValue());

		const registeredUser = await this.userRepository.insert(userEntity, hashedPassword);

		if (!registeredUser || !registeredUser.id) {
			throw new Error("Failed to register the user.");
		}

		return registeredUser;
	}

}
