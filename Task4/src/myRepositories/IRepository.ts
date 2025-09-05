export interface IRepository<T> {
  getAll(): Promise<T[]>;
  getById(id: number): Promise<T | undefined>;
  create(item: T): Promise<void>;
  update(id: number, item: Partial<T>): Promise<void>;
  delete(id: number): Promise<void>;
  find(filter: Partial<T>): Promise<T[]>;
}
