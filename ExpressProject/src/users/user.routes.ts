import express  from "express";
import { userController } from "./user.controller";
import { isAuthenticated,authorize } from "../shared/middlewares/authMiddleware";
import { ROLES } from "../shared/utils/constants";

const router = express.Router();

router.get("/me", isAuthenticated, userController.getMe.bind(userController));
router.put("/me", isAuthenticated, userController.updateMe.bind(userController));
router.post("/coach", isAuthenticated, authorize([ROLES.ADMIN]), userController.createCoach.bind(userController));

export default router;