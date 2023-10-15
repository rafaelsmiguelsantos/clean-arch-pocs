import { UserRepository } from "src/use-cases/ports/user-repository";
import { UseCase } from "src/use-cases/ports/use-case";
import { Either, left, right } from "src/shared/either";
import { Inject } from "@nestjs/common";
import { IMapper } from "src/use-cases/ports/imapper";
import { ExistingUserError } from "src/entities/RegisterError";
import { User } from "src/entities/User";
import { UserRequestDTO, UserResponse } from "../dto/user-dto";
import { UserDTO } from "src/interface/dto/user-converter";

export const PERSON_MAPPER_TOKEN = 'PERSON_MAPPER_TOKEN';

export class RegisterUserUseCase implements UseCase<UserRequestDTO, Either<Error, UserDTO>> {
	constructor(
		@Inject('UserRepositoryToken') private userRepository: UserRepository,
		@Inject(PERSON_MAPPER_TOKEN) private mapper: IMapper<UserRequestDTO, User>
	) { }

	async execute(userDTO: UserRequestDTO): Promise<Either<Error, UserDTO>> {
		const userOrError = this.mapper.toDomain(userDTO);

		if (userOrError.isLeft()) {
			return left(userOrError.value);
		}
		try {
			const existingUser = await this.userRepository.findByEmail(userOrError.value.getEmail().getValue());
			if (existingUser) {
				return left(new ExistingUserError('User already exists with this email'));
			}

			const insertedData = await this.userRepository.insert(userOrError.value);
			return right(insertedData);
		} catch (error) {
			return left(new Error(error.message || "An unexpected error occurred."));
		}
	}
}

