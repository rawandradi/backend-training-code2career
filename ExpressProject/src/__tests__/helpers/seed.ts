import { faker } from "@faker-js/faker";
import { api } from "./app";

// Ensures the default admin exists (your app should seed it on boot).
// Then we create dynamic users for tests using real endpoints to keep behavior realistic.

export const seedUsers = async () => {
  // ADMIN (use the note from your spec)
  const adminEmail = "admin@no.com";
  const adminPassword = "admin123";
  const adminToken = await login(adminEmail, adminPassword);

  // COACH #1
  const coach1 = {
    name: faker.person.fullName(),
    email: faker.internet.email().toLowerCase(),
    password: "coach123",
    role: "COACH"
  };
  const coach1Token = await createCoach(adminToken, coach1);

  // COACH #2
  const coach2 = {
    name: faker.person.fullName(),
    email: faker.internet.email().toLowerCase(),
    password: "coach123",
    role: "COACH"
  };
  const coach2Token = await createCoach(adminToken, coach2);

  // STUDENT
  const student = {
    name: faker.person.fullName(),
    email: faker.internet.email().toLowerCase(),
    password: "student123",
  };
  const studentToken = await register(student);

  return {
    admin: { ...coach1, token: adminToken, email: adminEmail, password: adminPassword },
    coach1: { ...coach1, token: coach1Token },
    coach2: { ...coach2, token: coach2Token },
    student: { ...student, token: studentToken }
  };
};

const login = async (email: string, password: string) => {
  const res = await api().post("/auth/login").send({ email, password });
  if (res.status !== 200) throw new Error(`Admin login failed: ${res.status} ${res.text}`);
  return res.body.token as string;
};

const createCoach = async (adminToken: string, coach: any) => {
  const res = await api()
    .post("/users/coach")
    .set("Authorization", `Bearer ${adminToken}`)
    .send(coach);
  if (res.status !== 201) throw new Error(`Create coach failed: ${res.status} ${res.text}`);
  // coach must login to get its token
  const loginRes = await api().post("/auth/login").send({ email: coach.email, password: coach.password });
  if (loginRes.status !== 200) throw new Error(`Coach login failed: ${loginRes.status} ${loginRes.text}`);
  return loginRes.body.token as string;
};

const register = async (student: any) => {
  const res = await api().post("/auth/register").send(student);
  if (res.status !== 201) throw new Error(`Register student failed: ${res.status} ${res.text}`);
  const loginRes = await api().post("/auth/login").send({ email: student.email, password: student.password });
  if (loginRes.status !== 200) throw new Error(`Student login failed: ${loginRes.status} ${loginRes.text}`);
  return loginRes.body.token as string;
};
