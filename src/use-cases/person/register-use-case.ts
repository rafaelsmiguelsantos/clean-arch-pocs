import { Person } from "src/entities/Person";
import { PersonRequestDTO, PersonResponse } from "src/interface/dto/personDto";
import { Repository } from "src/use-cases/ports/in-memory";
import { UseCase } from "src/use-cases/ports/use-case";
import { Either, left, right } from "src/shared/either";
import { Inject } from "@nestjs/common";
import { IMapper } from "src/use-cases/ports/imapper";

export const PERSON_MAPPER_TOKEN = 'PERSON_MAPPER_TOKEN';

export class RegisterUserUseCase implements UseCase<PersonRequestDTO, Either<Error, PersonResponse>> {
	constructor(
		@Inject('PersonRepositoryToken') private personRepository: Repository<Person, PersonResponse>,
		@Inject(PERSON_MAPPER_TOKEN) private mapper: IMapper<PersonRequestDTO, Person>
	) { }

	async execute(personDTO: PersonRequestDTO): Promise<Either<Error, PersonResponse>> {
		const personOrError = this.mapper.toDomain(personDTO);

		if (personOrError.isLeft()) {
			return left(personOrError.value);
		}
		try {
			// // Suponha que você verifica se o usuário já existe aqui
			// const existingUser = await this.personRepository.findByName(personOrError.value.name);
			// if (existingUser) {
			//     return left(new ExistingUserError('User already exists'));
			// }

			const insertedData = await this.personRepository.insert(personOrError.value);
			return right(insertedData);
		} catch (error) {
			return left(new Error(error.message || "An unexpected error occurred."));
		}
	}
}
