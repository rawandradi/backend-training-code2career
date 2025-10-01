import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const email = 'admin@no.com';
  const exists = await prisma.user.findUnique({ where: { email } });
  if (!exists) {
    const hashed = await bcrypt.hash('admin123', 10);
    await prisma.user.create({
      data: { name: 'Admin', email, password: hashed, role: Role.ADMIN }
    });
    console.log('Seeded admin user.');
  } else {
    console.log('Admin already exists.');
  }
}

main().finally(() => prisma.$disconnect());
