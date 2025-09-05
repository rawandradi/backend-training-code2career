import { UserManager } from './myRepositories/UserManager';
import { CourseCatalog } from './myRepositories/CourseCatalog';
import { BookingCenter } from './myRepositories/BookingCenter';

async function testRepositories() {
  const users = new UserManager();
  const courses = new CourseCatalog();
  const bookings = new BookingCenter();

  console.log('\nUsers:', await users.getAll());
  console.log('Courses:', await courses.getAll());
  console.log('Bookings:', await bookings.getAll());

  await users.create({ id: 3, name: 'Radwan', email: 'radwan@gmail.com' });
  console.log('\nAfter adding Radwan:', await users.getAll());

  await users.update(1, { name: 'Abeer Updated', email: 'abeer@gmail.com' });
  console.log('\nAfter updating Abeer:', await users.getById(1));

  await users.delete(2); // Noor
  console.log('\nAfter deleting Noor:', await users.getAll());

  const filteredUsers = await users.find({ name: 'Radwan' });
  console.log('\nSearching for Radwan:', filteredUsers);
}

testRepositories();
