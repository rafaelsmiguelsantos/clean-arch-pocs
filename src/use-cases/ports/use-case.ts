export interface UseCase<T, R> {
    /**
     * Execute the use case with the given request.
     * 
     * @param request Input for the use case.
     * @returns Promise that resolves with the result of the use case.
     */
    execute(request: T): Promise<R>;
  }