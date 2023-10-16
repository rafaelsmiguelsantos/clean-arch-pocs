import { UserRepository } from "src/use-cases/ports/user-repository";
import { UseCase } from "src/use-cases/ports/use-case";
import { UserNotFound } from "src/entities/RegisterError";
import { User } from "src/entities/User";

export class GetUserByIdUseCase implements UseCase<string, User> {
	constructor(
		private userRepository: UserRepository
	) { }

	async execute(userId: string): Promise<User> {
		const user = await this.userRepository.findById(userId);

		if (!user) {
			throw new UserNotFound();
		}

		return user;
	}
}
