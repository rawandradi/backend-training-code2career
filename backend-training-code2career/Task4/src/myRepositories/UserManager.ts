import { BaseRepository } from './BaseRepository';
import { User } from '../dataModels/User';

const mockUsers: User[] = [
  { id: 1, name: 'Alice', email: 'alice@mail.com' },
  { id: 2, name: 'Bob', email: 'bob@mail.com' },
];

export class UserManager extends BaseRepository<User> {
  constructor() {
    super(mockUsers);
  }
}
