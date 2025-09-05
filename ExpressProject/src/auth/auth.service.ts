import { v4 as uuidv4 } from "uuid";
import { RegisterDTO, LoginDTO } from "./auth.dto";
import { generatToken } from "../shared/utils/jwt";
import { CustomError } from "../shared/utils/exception";
import { ROLES } from "../shared/utils/constants";
import { User } from "../users/user.types";
import { userRepo } from "../users/user.repo";
import { hashPassword, comparePassword } from "../shared/utils/utils.hash";

async function seedAdmin() {
  const exists = userRepo.findAll().find((u) => u.email === "admin@no.com");
  if (!exists) {
    const hashed = await hashPassword("admin123");
    userRepo.create({
      id: uuidv4(),
      name: "Admin",
      email: "admin@no.com",
      password: hashed,
      role: ROLES.ADMIN,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}

seedAdmin();// create admin when start the servier

export class AuthService {
  async register(data: RegisterDTO): Promise<User> {
    const exists = userRepo.findAll().find((u) => u.email === data.email);
    if (exists) throw new CustomError("Email already exists", "AUTH", 400);

    const hashed = await hashPassword(data.password);

    const user: User = {
      id: uuidv4(),
      name: data.name,
      email: data.email,
      password: hashed,
      role: ROLES.STUDENT,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return userRepo.create(user);
  }

  async login(data: LoginDTO): Promise<{ token: string }> {
    const user = userRepo.findAll().find((u) => u.email === data.email);
    if (!user) throw new CustomError("Invalid credentials", "AUTH", 401);

    const isMatch = await comparePassword(data.password, user.password);
    if (!isMatch) throw new CustomError("Invalid credentials", "AUTH", 401);

    const token = generatToken({ id: user.id, role: user.role });
    return { token };
  }
}

export const authService = new AuthService();
