import { v4 as uuidv4 } from "uuid";
import { RegisterDTO, LoginDTO } from "./auth.dto";
import { generatToken } from "../shared/utils/jwt";
import { CustomError } from "../shared/utils/exception";
import { ROLES } from "../shared/utils/constants";
import { User } from "../users/user.types";
import { userRepo } from "../users/user.repo";
import { hashPassword, comparePassword } from "../shared/utils/utils.hash";
import { prisma } from "../shared/prisma";


async function seedAdmin() {
  const email = "admin@no.com";
  const exists = await prisma.user.findUnique({ where: { email } });
  if (!exists) {
    const hashed = await hashPassword("admin123");
    await prisma.user.create({
      data: {
        name: "Admin",
        email,
        password: hashed,
        role: ROLES.ADMIN,
      },
    });
    console.log("Seeded default admin (admin@no.com / admin123)");
  }
}

seedAdmin().catch((e) => console.error("Seed admin failed:", e));

export class AuthService {
  async register(data: RegisterDTO): Promise<Omit<User, "password">> {
    const exists = await prisma.user.findUnique({ where: { email: data.email } });
    if (exists) throw new CustomError("Email already exists", "AUTH", 400);

    const hashed = await hashPassword(data.password);

    const created = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashed,
        role: ROLES.STUDENT,
      },
    });

    return {
      id: created.id,
      name: created.name,
      email: created.email,
      role: created.role as User["role"],
      createdAt: created.createdAt,
      updatedAt: created.updatedAt,
    };
  }

  async login(data: LoginDTO): Promise<{ token: string }> {
    const user = await prisma.user.findUnique({ where: { email: data.email } });
    if (!user) throw new CustomError("Invalid credentials", "AUTH", 401);

    const isMatch = await comparePassword(data.password, user.password);
    if (!isMatch) throw new CustomError("Invalid credentials", "AUTH", 401);

    const token = generatToken({ id: user.id, role: user.role });
    return { token };
  }
}

export const authService = new AuthService();
