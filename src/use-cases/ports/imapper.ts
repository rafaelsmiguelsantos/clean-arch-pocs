import { Either } from "src/shared/either";

export interface IMapper<I, O> {
    toDomain(input: I):  Either<Error, O>;
    // Se necessário, você pode adicionar mais métodos, como 'toDTO' etc.
}