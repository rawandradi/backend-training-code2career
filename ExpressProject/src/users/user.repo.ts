import { GenericRepository } from "../shared/repository/GenericRepository";
import { User } from "./user.types";

export const userRepo = new GenericRepository<User>();
