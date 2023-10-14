export interface Repository<T, R> {
    insert(item: T): Promise<R>;
  }
  