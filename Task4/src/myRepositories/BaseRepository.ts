import { IRepository } from './IRepository';

export class BaseRepository<T extends { id: number }> implements IRepository<T> {
  protected data: T[];

  constructor(initialData: T[]) {
    this.data = initialData;
  }

  async getAll(): Promise<T[]> {
    return this.data;
  }

  async getById(id: number): Promise<T | undefined> {
    return this.data.find(item => item.id === id);
  }

  async create(item: T): Promise<void> {
    this.data.push(item);
  }

  async update(id: number, item: Partial<T>): Promise<void> {
    const index = this.data.findIndex(i => i.id === id);
    if (index !== -1) {
      this.data[index] = { ...this.data[index], ...item };
    }
  }

  async delete(id: number): Promise<void> {
    this.data = this.data.filter(item => item.id !== id);
  }

  async find(filter: Partial<T>): Promise<T[]> {
    return this.data.filter(item =>
      Object.entries(filter).every(
        ([key, value]) => item[key as keyof T] === value
      )
    );
  }
}
