import { Router } from "express";
import { GroupMessageController } from "./g-message.controller";
import { authMiddleware } from "../../shared/middlewares/auth.middleware";
import { adminMiddleware } from "../../shared/middlewares/admin.middleware";
import { tutorMiddleware } from "../../shared/middlewares/tutor.middleware";

const router = Router();
const controller = new GroupMessageController();

router.post("/",
  authMiddleware,
  tutorMiddleware, controller.create.bind(controller));
router.get(
  "/",
  authMiddleware,
   adminMiddleware,
  controller.list.bind(controller)
);
router.get(
  "/:id",
  authMiddleware,
  adminMiddleware,
  controller.getById.bind(controller)
);
router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  controller.update.bind(controller)
);
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  controller.delete.bind(controller)
);

export default router;
