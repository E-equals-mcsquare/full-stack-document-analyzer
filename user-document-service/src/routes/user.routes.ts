import express from "express";
import * as userController from "../controllers/user.controller";
import { verifyToken } from "../middleware/auth.middleware";
import { requireRole } from "../middleware/role.middleware";

const router = express.Router();

router.use(verifyToken, requireRole("admin"));

router.get("/", userController.getAllUsers);
router.patch("/:id/role", userController.updateUserRole);
router.delete("/:id", userController.deleteUser);

export default router;
