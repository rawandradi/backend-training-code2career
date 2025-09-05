import bcrypt from "bcryptjs";

const SALT_ROUNDS = 10;

// Hash password before saving
export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, SALT_ROUNDS);
}

// Compare plain password with hashed one
export async function comparePassword(password: string, hashed: string): Promise<boolean> {
  return await bcrypt.compare(password, hashed);
}
