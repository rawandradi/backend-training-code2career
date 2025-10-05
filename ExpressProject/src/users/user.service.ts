import { CreateCoachDTO, UpdateProfileDTO } from "./user.dto";   // ✅ النوع فقط
import { CustomError } from "../shared/utils/exception";
import { User } from "./user.types";
import { ROLES } from "../shared/utils/constants";
import { hashPassword } from "../shared/utils/utils.hash";
import { prisma } from "../shared/prisma";

const toPublic = (u: any): Omit<User, "password"> => ({
  id: u.id,
  name: u.name,
  email: u.email,
  role: u.role,
  createdAt: u.createdAt,
  updatedAt: u.updatedAt,
});

export class UserService {
  async getProfile(userId: string): Promise<Omit<User, "password">> {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new CustomError("User not found", "USER", 404);
    return toPublic(user);
  }

  async updateProfile(userId: string, data: UpdateProfileDTO): Promise<Omit<User, "password">> {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new CustomError("User not found", "USER", 404);

    const payload: any = {
      ...(data.name !== undefined && { name: data.name }),
      ...(data.email !== undefined && { email: data.email }),
      ...(data.password !== undefined && {
        password: await hashPassword(data.password),
      }),
    };

    const updated = await prisma.user.update({
      where: { id: userId },
      data: payload,
    });

    return toPublic(updated);

  }

async createCoach(data: CreateCoachDTO): Promise<Omit<User, "password">> {
    const exists = await prisma.user.findUnique({ where: { email: data.email } });
    if (exists) throw new CustomError("Email already exists", "USER", 400);
    const hashed = await hashPassword(data.password);
    const created = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashed,
        role: ROLES.COACH,
      },
    });

    return toPublic(created);
  }
}



export const userService = new UserService();
