import { BaseRepository } from './BaseRepository';
import { Booking } from '../dataModels/Booking';

const mockBookings: Booking[] = [
  { id: 1, userId: 1, courseId: 1, date: '2025-01-01' },
  { id: 2, userId: 2, courseId: 2, date: '2025-02-01' },
];

export class BookingCenter extends BaseRepository<Booking> {
  constructor() {
    super(mockBookings);
  }
}
