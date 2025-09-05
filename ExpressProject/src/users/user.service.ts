import { v4 as uuidv4 } from "uuid";
import { GenericRepository } from "../shared/repository/GenericRepository";
import { CreateCoachDTO, UpdateProfileDTO } from "./user.dto";   // ✅ النوع فقط
import { CustomError } from "../shared/utils/exception";
import { User } from "./user.types";
import { ROLES } from "../shared/utils/constants";
import { userRepo } from "./user.repo";
import { hashPassword } from "../shared/utils/utils.hash";

export class UserService {
  getProfile(userId: string): User {
    return userRepo.findById(userId);
  }

  async updateProfile(userId: string, data: UpdateProfileDTO): Promise<User> {
    const user = userRepo.findById(userId);
    if (!user) throw new CustomError("User not found", "USER", 404);

    const updateData: Partial<User> = {
      ...(data.name !== undefined && { name: data.name }),
      ...(data.email !== undefined && { email: data.email }),
      ...(data.password !== undefined && {
        password: await hashPassword(data.password), // 👈 نعمل hash للباسوورد الجديد
      }),
      updatedAt: new Date(),
    };

    return userRepo.update(userId, updateData);

  }

async createCoach(data: CreateCoachDTO): Promise<User> {
    const exists = userRepo.findAll().find((u) => u.email === data.email);
    if (exists) throw new CustomError("Email already exists", "USER", 400);
    const hashed = await hashPassword(data.password);
    const coach: User = {
      id: uuidv4(),
      name: data.name,
      email: data.email,
      password: hashed,
      role: ROLES.COACH,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return userRepo.create(coach);
  }
}



export const userService = new UserService();
