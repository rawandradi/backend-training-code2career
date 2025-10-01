import { RegisterDTO, LoginDTO } from "./auth.dto";
import { generatToken } from "../shared/utils/jwt";
import { CustomError } from "../shared/utils/exception";
import { ROLES } from "../shared/utils/constants";
import { hashPassword, comparePassword } from "../shared/utils/utils.hash";
import { prisma } from "../shared/db";

export class AuthService {
  async register(data: RegisterDTO){
    const exists = await prisma.user.findUnique({ where: { email: data.email } });
    if (exists) throw new CustomError("Email already exists", "AUTH", 400);

    const hashed = await hashPassword(data.password);

    const user = await prisma.user.create({
  data: {
    name: data.name,
    email: data.email,
    password: hashed,
    role: "STUDENT", // Prisma enum Role
  },
});

return user;
  }

  async login(data: LoginDTO): Promise<{ token: string }> {
    const user = await prisma.user.findUnique({ where: { email: data.email } });;
    if (!user) throw new CustomError("Invalid credentials", "AUTH", 401);

    const isMatch = await comparePassword(data.password, user.password);
    if (!isMatch) throw new CustomError("Invalid credentials", "AUTH", 401);

    const token = generatToken({ id: user.id, role: user.role });
    return { token };
  }
}

export const authService = new AuthService();
