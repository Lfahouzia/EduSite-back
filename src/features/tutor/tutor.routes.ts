import { Router } from "express";
import { TutorController } from "./tutor.controller";
import { authMiddleware } from "../../shared/middlewares/auth.middleware";
import { adminMiddleware } from "../../shared/middlewares/admin.middleware";



const router = Router();
const controller = new TutorController();

router.get("/",
  authMiddleware,
  adminMiddleware,
  
  controller.listTutors.bind(controller));
  
router.put(
  "/status",
  authMiddleware,
  adminMiddleware,
  controller.updateTutorStatus.bind(controller)
);

export default router;