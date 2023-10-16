export interface IMapper<I, O> {
    toDomain(input: I):  { success?: O, failure?: Error };
    // Se necessário, você pode adicionar mais métodos, como 'toDTO' etc.
  }