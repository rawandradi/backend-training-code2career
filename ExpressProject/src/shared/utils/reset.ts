// src/shared/reset.ts
import { userRepo } from "../../users/user.repo";
import { courseRepo } from "../../courses/course.service"

export const resetAll = () => {
  userRepo._reset();
  courseRepo._reset();
};
