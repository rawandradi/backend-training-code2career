import express from "express";
import { courseController } from "./course.controller";
import { isAuthenticated,authorize } from "../shared/middlewares/authMiddleware";
import { ROLES } from "../shared/utils/constants";

const router = express.Router();

router.post("/", isAuthenticated, authorize([ROLES.COACH, ROLES.ADMIN]), courseController.create.bind(courseController));
router.get("/", courseController.getAll.bind(courseController));
router.get("/:id", courseController.getById.bind(courseController));
router.put("/:id", isAuthenticated, courseController.update.bind(courseController));
router.delete("/:id", isAuthenticated, courseController.remove.bind(courseController));

export default router;