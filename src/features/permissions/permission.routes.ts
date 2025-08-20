import { Router } from "express";
import { PermissionController } from "./permission.controller";
import { authMiddleware } from "../../shared/middlewares/auth.middleware";
import { adminMiddleware } from "../../shared/middlewares/admin.middleware";

const router = Router();
const controller = new PermissionController();

// 🔹 CRUD permissions
router.post("/",authMiddleware,adminMiddleware,  controller.create.bind(controller));
router.get(
  "/",
  authMiddleware,
  adminMiddleware,
  controller.findAll.bind(controller)
);
router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  controller.update.bind(controller)
);
router.get(
  "/:id",
  authMiddleware,
  adminMiddleware,
  controller.findById.bind(controller)
);
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  controller.delete.bind(controller)
);

export default router;
