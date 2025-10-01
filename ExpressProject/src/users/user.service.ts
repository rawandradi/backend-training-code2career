import { CreateCoachDTO, UpdateProfileDTO } from "./user.dto";
import { CustomError } from "../shared/utils/exception";
import { hashPassword } from "../shared/utils/utils.hash";
import { prisma } from "../shared/db";  
import { Role, Prisma } from "@prisma/client";

const safeUserSelect = {
  id: true,
  name: true,
  email: true,
  role: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.UserSelect;

type SafeUser = Prisma.UserGetPayload<{ select: typeof safeUserSelect }>;

export class UserService {
  async getProfile(userId: string): Promise<SafeUser> {
     const user = await prisma.user.findUnique({
      where: { id: userId },
      select: safeUserSelect,
    });
    if (!user) throw new CustomError("User not found", "USER", 404);
    return user;
  }

  async updateProfile(userId: string, data: UpdateProfileDTO): Promise<SafeUser> {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new CustomError("User not found", "USER", 404);

    const updateData: Prisma.UserUpdateInput = {
      ...(data.name !== undefined && { name: data.name }),
      ...(data.email !== undefined && { email: data.email }),
      ...(data.password !== undefined && {
        password: await hashPassword(data.password),
      }),
    };

    try {
      const updated = await prisma.user.update({
        where: { id: userId },
        data: updateData,
        select: safeUserSelect,
      });

      return updated;

      } catch (e: any) {
      if (e?.code === "P2002") {
        // unique constraint (مثل ايميل مكرر)
        throw new CustomError("Email already exists", "USER", 400);
      }
       throw e;
    }
  }

async createCoach(data: CreateCoachDTO): Promise<SafeUser> {
    const exists = await prisma.user.findUnique({
      where: { email: data.email },
      select: { id: true },
    });
    if (exists) throw new CustomError("Email already exists", "USER", 400);
    const hashed = await hashPassword(data.password);
    const coach = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashed,
        role: Role.COACH,
      },
      select: safeUserSelect,
    });

    return coach;
  }
}



export const userService = new UserService();
