import { RoleType } from "../shared/utils/constants";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string; // رح يكون hashed
  role: RoleType;   // "ADMIN" | "COACH" | "STUDENT"
  createdAt: Date;
  updatedAt: Date;
}
