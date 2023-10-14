import { Person } from "src/entities/Person";
import { PersonResponseDTO, PersonResponse, PersonRequestDTO } from "src/interface/dto/personDto";
import { Repository } from "src/use-cases/ports/in-memory";
import { UseCase } from "src/use-cases/ports/use-case";

export class GetUserUseCase implements UseCase<string, PersonResponseDTO> {
    constructor(private personRepository: Repository<PersonRequestDTO, PersonResponse>) { }

    async execute(id: string): Promise<PersonResponseDTO> {
        return null
    }
}
