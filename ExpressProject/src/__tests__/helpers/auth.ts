import { api } from "./app";

// Assumes your /auth/register returns { token, user } and /auth/login returns { token }
export const loginAs = async (email: string, password: string) => {
  const res = await api().post("/auth/login").send({ email, password });
  if (res.status !== 200) {
    throw new Error(`Login failed for ${email}: ${res.status} ${res.text}`);
  }
  return res.body.token as string;
};

export const authHeader = (token: string) => ({ Authorization: `Bearer ${token}` });
