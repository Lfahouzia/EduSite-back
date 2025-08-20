import { Router } from "express";
import { AuthController } from "./auth.controller";
import { authMiddleware } from "../../shared/middlewares/auth.middleware";
import { adminMiddleware } from "../../shared/middlewares/admin.middleware";

const router = Router();
const controller = new AuthController();

router.post("/auth/register", controller.register.bind(controller));
router.post("/auth/login", controller.login.bind(controller));

router.get(
  "/users",
  authMiddleware,
  adminMiddleware,
  controller.getUsers.bind(controller)
);
router.get(
  "/users/:id",
  authMiddleware,
  controller.getUser.bind(controller)
);
router.put(
  "/users/:id",
  authMiddleware,
  controller.updateUser.bind(controller)
);
// router.delete("/:id", controller.deleteUser.bind(controller));

export default router;
