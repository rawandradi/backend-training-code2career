import { BaseRepository } from './BaseRepository';
import { Course } from '../dataModels/Course';

const mockCourses: Course[] = [
  { id: 1, title: 'Intro to Math', instructor: 'Dr. Smith' },
  { id: 2, title: 'Physics Basics', instructor: 'Dr. Johnson' },
];

export class CourseCatalog extends BaseRepository<Course> {
  constructor() {
    super(mockCourses);
  }
}
