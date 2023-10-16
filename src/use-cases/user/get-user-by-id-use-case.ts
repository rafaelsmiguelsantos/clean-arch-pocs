import { UserRepository } from "src/use-cases/ports/user-repository";
import { UseCase } from "src/use-cases/ports/use-case";
import { UserNotFound } from "src/entities/RegisterError";
import { User } from "src/entities/User";
import { UserResponseDTO } from "../dto/user-dto";

export class GetUserByIdUseCase implements UseCase<string, UserResponseDTO> {
	constructor(
		private userRepository: UserRepository
	) { }

	async execute(userId: string): Promise<UserResponseDTO> {
		const user = await this.userRepository.findById(userId);

		if (!user) {
			throw new UserNotFound("User not found.");
		}

		return user;
	}
}
